import React, { useState, useEffect } from "react";
import { FiImage, FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheckSquare, FiSquare, FiEye, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useSeedBannersMutation
} from "../../../../../services/heroBannerApi";
import { useGetNavbarItemsQuery } from "../../../../../services/navbarApi";
import { BACKEND_URL, getImageUrl } from "../../../../../config/apiConfig";

const CarouselManager = () => {
  const { data: banners = [], isLoading: bannersLoading } = useGetAllBannersQuery();
  const { data: navItemsData = [], isLoading: navLoading, error: navError } = useGetNavbarItemsQuery();

  // Helper to normalize paths for comparison
  const normalizePath = (path) => {
    if (!path) return '';
    let p = path.trim().toLowerCase();
    if (!p.startsWith('/')) p = '/' + p;
    if (p.endsWith('/') && p.length > 1) p = p.slice(0, -1);
    return p;
  };

  useEffect(() => {
    if (navError) {
      toast.error("Failed to load pages! Please check server/database.");
    }
  }, [navError]);

  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [seedBanners, { isLoading: isSeeding }] = useSeedBannersMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [currentBanner, setCurrentBanner] = useState({
    badge: '',
    titleHighlight1: '',
    titleHighlight2: '',
    titleHighlight3: '',
    titleEnd: '',
    subtitle: '',
    buttons: [{ text: '', link: '' }],
    pagePath: '/',
    isActive: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [selectedParentObj, setSelectedParentObj] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewBanner, setViewBanner] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());

  // Sync selectedParentObj when data loads or during editing
  useEffect(() => {
    if (navError) {
      toast.error("Failed to load pages! Please check server/database.");
    }
  }, [navError]);

  useEffect(() => {
    if (navItemsData.length > 0 && currentBanner.pagePath) {
      const bannerPath = normalizePath(currentBanner.pagePath);
      
      // Smart Search for Parent Category
      const parent = navItemsData.find(p => {
        const pPath = normalizePath(p.href);
        const pLabel = (p.label || '').toLowerCase();
        
        // 1. Direct Match (e.g. /about === /about)
        if (pPath !== '/' && pPath === bannerPath) return true;
        
        // 2. Child Match (Exact)
        if (p.children && p.children.some(c => normalizePath(c.href) === bannerPath)) return true;
        
        // 3. Prefix Match (e.g. /kundli/matching starts with /kundli)
        // Only if parent has children or is a known dynamic category
        if (pPath !== '/' && bannerPath.startsWith(pPath + '/')) return true;
        
        // 4. Keyword Fallback (Critical for dynamic modules like Kundli)
        if (pLabel.includes('kundli') && bannerPath.startsWith('/kundli')) return true;
        if (pLabel.includes('astrology') && bannerPath.startsWith('/astrology')) return true;
        if (pLabel.includes('puja') && bannerPath.startsWith('/puja')) return true;
        if (pLabel.includes('learn') && bannerPath.startsWith('/learn')) return true;
        
        return false;
      });

      if (parent) setSelectedParentObj(parent);
    }
  }, [navItemsData, currentBanner.pagePath]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(currentBanner).forEach(key => {
      if (key === 'buttons') {
        formData.append(key, JSON.stringify(currentBanner[key]));
      } else {
        formData.append(key, currentBanner[key]);
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (!isEditing) {
      toast.error("Image is required for a new banner");
      return;
    }

    try {
      if (isEditing) {
        await updateBanner({ id: currentBanner._id, formData }).unwrap();
        toast.success("Banner updated!");
      } else {
        await createBanner(formData).unwrap();
        toast.success("Banner added!");
      }
      resetForm();
    } catch (error) {
      toast.error("Error saving banner");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteBanner(id).unwrap();
      toast.success("Banner deleted");
    } catch (error) {
      toast.error("Error deleting banner");
    }
  };

  const handleEdit = (banner) => {
    const updatedBanner = { 
      ...banner, 
      pagePath: banner.pagePath || '/',
      buttons: banner.buttons && banner.buttons.length > 0 ? banner.buttons : [{ text: '', link: '' }]
    };
    setCurrentBanner(updatedBanner);
    setImageFile(null);
    setIsEditing(true);

    // Explicitly find parent for immediate UI update
    if (navItemsData.length > 0) {
      const bannerPath = normalizePath(updatedBanner.pagePath);
      const parent = navItemsData.find(p => 
        normalizePath(p.href) === bannerPath || 
        (p.children && p.children.some(c => normalizePath(c.href) === bannerPath))
      );
      setSelectedParentObj(parent || null);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const resetForm = () => {
    setCurrentBanner({
      badge: '',
      titleHighlight1: '',
      titleHighlight2: '',
      titleHighlight3: '',
      titleEnd: '',
      subtitle: '',
      buttons: [{ text: '', link: '' }],
      pagePath: '/',
      isActive: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: ''
    });
    setImageFile(null);
    setSelectedParentObj(null);
    setIsEditing(false);
    setFileKey(Date.now());
  };

  const openViewModal = (banner) => {
    setViewBanner(banner);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gray-100 rounded-xl shadow-md text-blue-900 border border-blue-900/20">
          <FiImage size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic-none">Hero Banners <span className="text-orange-600">Manager</span></h1>
          <p className="text-sm text-gray-500 font-medium italic-none">Manage dynamic hero banners and page-specific sliders</p>
        </div>
      </div>

      {/* Seed Utility Section */}
      <div className="bg-gradient-to-r from-blue-900/5 to-rose-400/5 rounded-2xl p-6 border border-blue-900/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiSave className="text-blue-900" /> Hero Banners Seed Utility
          </h3>
          <p className="text-xs text-gray-500 mt-1">Populate the carousel with high-quality sample data. Warning: This will overwrite existing banners.</p>
        </div>
        <button
          onClick={async () => {
            if (window.confirm("Restore sample hero banners? This will delete current banners.")) {
              try {
                await seedBanners().unwrap();
                toast.success("Hero Banners Seeded!");
              } catch (e) { toast.error("Seeding failed"); }
            }
          }}
          disabled={isSeeding}
          className="px-8 py-2.5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 shadow-md shadow-blue-900/20 transition-all text-sm disabled:opacity-50 flex items-center gap-2"
        >
          {isSeeding ? "Syncing..." : "🔥 Seed Hero Banners"}
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          {isEditing ? <FiEdit2 className="text-blue-900" /> : <FiPlus className="text-blue-900" />}
          {isEditing ? 'Edit Hero Banner' : 'Add New Hero Banner'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl mb-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">Assign to Main Page</label>
              <div className="relative">
                <select
                  value={selectedParentObj ? selectedParentObj._id : (currentBanner.pagePath === '/' ? 'home' : '')}
                  onChange={(e) => {
                    if (e.target.value === 'home') {
                      setSelectedParentObj(null);
                      setCurrentBanner({ ...currentBanner, pagePath: '/' });
                    } else if (e.target.value === '') {
                        setSelectedParentObj(null);
                        setCurrentBanner({ ...currentBanner, pagePath: '' });
                    } else {
                      const p = navItemsData.find(item => item._id === e.target.value);
                      setSelectedParentObj(p);
                      setCurrentBanner({ ...currentBanner, pagePath: p.href || '/' });
                    }
                  }}
                  className="w-full pl-4 pr-10 py-2.5 border-2 border-blue-900/10 rounded-xl focus:ring-4 focus:ring-blue-900/10 bg-white font-bold text-gray-700 outline-none appearance-none cursor-pointer transition-all"
                >
                  <option value="">--- Select Category ---</option>
                  <option value="home">Home Page ( / )</option>
                  {navLoading ? (
                    <option disabled>Loading pages...</option>
                  ) : (
                    navItemsData.map(item => (
                      <option key={item._id} value={item._id}>{item.label}</option>
                    ))
                  )}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-900 pointer-events-none" />
              </div>
            </div>

            {selectedParentObj && selectedParentObj.children && selectedParentObj.children.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">Assign to Sub-Page</label>
                <div className="relative">
                  <select
                    value={currentBanner.pagePath}
                    onChange={(e) => setCurrentBanner({ ...currentBanner, pagePath: e.target.value })}
                    className="w-full pl-4 pr-10 py-2.5 border-2 border-blue-900/10 rounded-xl focus:ring-4 focus:ring-blue-900/10 bg-white font-bold text-gray-700 outline-none appearance-none cursor-pointer transition-all"
                  >
                    <option value={selectedParentObj.href}>-- Use Main Page Banner --</option>
                    {selectedParentObj.children.map((child, idx) => (
                      <option key={`${selectedParentObj._id}-child-${idx}`} value={child.href}>{child.label} ({child.href})</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-900 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Badge Text</label>
              <input
                type="text" value={currentBanner.badge}
                placeholder="e.g. AUTHENTIC VEDIC SERVICES"
                onChange={(e) => setCurrentBanner({ ...currentBanner, badge: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title Part 1 (Optional/Regular)</label>
              <input
                type="text" value={currentBanner.titleHighlight1}
                placeholder="e.g. Experience"
                onChange={(e) => setCurrentBanner({ ...currentBanner, titleHighlight1: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title Part 2 (Highlight 1 - Red)</label>
              <input
                type="text" value={currentBanner.titleHighlight2}
                placeholder="e.g. Divine"
                onChange={(e) => setCurrentBanner({ ...currentBanner, titleHighlight2: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title Part 3 (Highlight 2 - Yellow)</label>
              <input
                type="text" value={currentBanner.titleHighlight3}
                placeholder="e.g. Blessings"
                onChange={(e) => setCurrentBanner({ ...currentBanner, titleHighlight3: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title Part 4 (Optional/End)</label>
              <input
                type="text" value={currentBanner.titleEnd}
                placeholder="e.g. At Your Doorstep"
                onChange={(e) => setCurrentBanner({ ...currentBanner, titleEnd: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-800">Action Buttons</label>
              <button
                type="button"
                onClick={() => setCurrentBanner({
                  ...currentBanner,
                  buttons: [...currentBanner.buttons, { text: '', link: '' }]
                })}
                className="text-xs bg-blue-900 text-white px-3 py-1 rounded-lg hover:bg-blue-800 flex items-center gap-1"
              >
                <FiPlus size={12} /> Add Button
              </button>
            </div>
            
            {currentBanner.buttons.map((btn, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-blue-50/50 p-4 rounded-xl border border-blue-900/10 relative">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">Button {idx + 1} Text</label>
                  <input
                    type="text" value={btn.text}
                    placeholder="e.g. Explore Now"
                    onChange={(e) => {
                      const newBtns = [...currentBanner.buttons];
                      newBtns[idx] = { ...newBtns[idx], text: e.target.value };
                      setCurrentBanner({ ...currentBanner, buttons: newBtns });
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none bg-white font-medium"
                  />
                </div>
                <div className="space-y-2 pr-10">
                  <label className="text-xs font-medium text-gray-600">Button {idx + 1} URL</label>
                  <input
                    type="text" value={btn.link}
                    placeholder="e.g. /services"
                    onChange={(e) => {
                      const newBtns = [...currentBanner.buttons];
                      newBtns[idx] = { ...newBtns[idx], link: e.target.value };
                      setCurrentBanner({ ...currentBanner, buttons: newBtns });
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none bg-white font-medium"
                  />
                </div>
                {currentBanner.buttons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newBtns = currentBanner.buttons.filter((_, i) => i !== idx);
                      setCurrentBanner({ ...currentBanner, buttons: newBtns });
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-rose-600 hover:bg-rose-100 rounded-full transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subtitle</label>
            <textarea
              value={currentBanner.subtitle}
              placeholder="e.g. Connect with sacred traditions through authentic rituals..."
              onChange={(e) => setCurrentBanner({ ...currentBanner, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Banner Image File {isEditing && "(Leave empty to keep existing)"}</label>
              <input
                key={fileKey}
                type="file" accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2 flex items-center pt-8">
              <button
                type="button"
                onClick={() => setCurrentBanner({ ...currentBanner, isActive: !currentBanner.isActive })}
                className="flex items-center gap-2 text-gray-700 focus:outline-none"
              >
                {currentBanner.isActive ? <FiCheckSquare className="text-blue-900" size={20} /> : <FiSquare className="text-gray-400" size={20} />}
                <span className="font-medium text-sm">Active (Show on Website)</span>
              </button>
            </div>
          </div>


          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button" onClick={resetForm}
              className="px-6 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <FiX /> Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <FiSave /> {isEditing ? 'Update Banner' : 'Save Banner'}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Current Banners</h2>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-gray-100 sticky top-0 z-20 shadow-sm border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Badge</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Titles Pattern</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Buttons</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Page</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {banners.map((banner, index) => (
                <tr key={banner._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">
                    {banner.imageUrl && (
                      <img
                        src={getImageUrl(banner.imageUrl)}
                        alt="Banner"
                        className="w-16 h-10 object-cover rounded shadow-sm"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{banner.badge}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    <div className="text-xs truncate max-w-[150px]">{banner.titleHighlight1} <span className="text-red-500">{banner.titleHighlight2}</span> <span className="text-blue-900">{banner.titleHighlight3}</span> {banner.titleEnd}</div>
                  </td>
                  <td className="px-6 py-4">
                    {banner.buttons && banner.buttons.map((btn, i) => (
                      <div key={i} className="mb-1 last:mb-0">
                        <div className="text-xs font-bold text-blue-600">{btn.text || 'Untitled'}</div>
                        <div className="text-[9px] text-gray-400 truncate max-w-[100px]">{btn.link || 'No path'}</div>
                      </div>
                    ))}
                    {(!banner.buttons || banner.buttons.length === 0) && <span className="text-gray-400 text-[10px]">No buttons</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] text-amber-800 bg-amber-100 rounded px-2 py-0.5 inline-block font-bold border border-amber-200">{banner.pagePath || '/'}</div>
                  </td>
                  <td className="px-6 py-4">
                    {banner.isActive ? (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">Active</span>
                    ) : (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openViewModal(banner)} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-all border border-green-200">
                        <FiEye size={16} />
                      </button>
                      <button onClick={() => handleEdit(banner)} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-all border border-green-200">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(banner._id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all border border-red-200">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && !bannersLoading && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">No hero banners found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && viewBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <FiEye size={20} />
                <h3 className="font-bold text-lg">Banner Details</h3>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-all">
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {viewBanner.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img src={getImageUrl(viewBanner.imageUrl)} alt="Banner" className="w-full h-48 object-cover object-center" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Badge</p>
                  <p className="font-bold text-gray-800">{viewBanner.badge}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  {viewBanner.isActive ? (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">Active</span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">Inactive</span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Page Assignment</p>
                  <code className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded text-sm font-semibold">{viewBanner.pagePath || '/'}</code>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Button Config</p>
                  <div className="flex flex-col gap-2">
                    {viewBanner.buttons && viewBanner.buttons.map((btn, i) => (
                      <div key={i} className="bg-white p-2 rounded border border-gray-100">
                        <p className="font-bold text-blue-600 text-xs">{btn.text || 'No Text'}</p>
                        <code className="text-[9px] text-gray-500">{btn.link || 'No Link'}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Title Configuration</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500">Part 1 (Regular)</p>
                    <p className="font-semibold text-gray-800">{viewBanner.titleHighlight1}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Part 2 (Red Highlight)</p>
                    <p className="font-semibold text-red-500">{viewBanner.titleHighlight2}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Part 3 (Yellow Highlight)</p>
                    <p className="font-semibold text-blue-900">{viewBanner.titleHighlight3}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Part 4 (Ending)</p>
                    <p className="font-semibold text-gray-800">{viewBanner.titleEnd}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Subtitle</p>
                <p className="text-sm text-gray-700 leading-relaxed">{viewBanner.subtitle}</p>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEdit(viewBanner);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm shadow-md hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <FiEdit2 size={14} /> Edit This Banner
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselManager;
