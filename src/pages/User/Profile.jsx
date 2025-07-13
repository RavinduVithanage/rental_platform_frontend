import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Star,
  Award,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Settings,
  CheckCircle,
  AlertCircle,
  Upload,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Link,
} from "lucide-react";
import api from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const { user, setError: setAuthError } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    joinDate: "",
    avatar: "",
    languages: [],
    verified: false,
    superHost: false,
    notification_settings: {
      email_notifications: true,
      push_notifications: true,
      sms_notifications: false,
      marketing_emails: true,
    },
    two_factor_enabled: false,
  });

  const [tempData, setTempData] = useState(profileData);
  const [stats, setStats] = useState([
    {
      label: "Total Listings",
      value: "0",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Reviews",
      value: "0",
      icon: Star,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Response Rate",
      value: "0%",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Profile Views",
      value: "0",
      icon: Eye,
      color: "from-orange-500 to-red-500",
    },
  ]);

  const [recentReviews, setRecentReviews] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    marketing_emails: true,
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
    fetchUserStats();
    fetchUserReviews();
    fetchNotificationSettings();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/profile");
      if (response.data.success) {
        const userData = response.data.data;
        const formattedData = {
          firstName: userData.firstName || userData.first_name || "",
          lastName: userData.lastName || userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          bio: userData.bio || "",
          joinDate: userData.created_at || userData.joinDate || "",
          avatar:
            userData.avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          languages: userData.languages || [],
          verified: userData.verified || false,
          superHost: userData.superHost || userData.super_host || false,
          notification_settings: userData.notification_settings || {},
          two_factor_enabled: userData.two_factor_enabled || false,
        };
        setProfileData(formattedData);
        setTempData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await api.get("/profile/stats");
      if (response.data.success) {
        const statsData = response.data.data;
        setStats([
          {
            label: "Total Listings",
            value: statsData.total_listings?.toString() || "0",
            icon: TrendingUp,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Total Reviews",
            value: statsData.total_reviews?.toString() || "0",
            icon: Star,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "Response Rate",
            value: statsData.response_rate || "0%",
            icon: MessageCircle,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Profile Views",
            value: statsData.profile_views || "0",
            icon: Eye,
            color: "from-orange-500 to-red-500",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUserReviews = async () => {
    try {
      const response = await api.get("/profile/reviews");
      if (response.data.success) {
        setRecentReviews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchNotificationSettings = async () => {
    try {
      const response = await api.get("/profile/notifications");
      if (response.data.success) {
        setNotificationSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching notification settings:", error);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const updateData = {
        first_name: tempData.firstName,
        last_name: tempData.lastName,
        email: tempData.email,
        phone: tempData.phone,
        location: tempData.location,
        bio: tempData.bio,
        languages: tempData.languages,
      };

      const response = await api.put("/profile", updateData);

      if (response.data.success) {
        setProfileData(tempData);
        setIsEditing(false);
        // Show success message
        setError(null);
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setError(errorMessages[0]);
      } else {
        setError("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
    setError(null);
  };
  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (2MB limit as per API docs)
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }

      setIsUploadingImage(true);
      setError(null);

      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append("avatar", file);

        const response = await api.post("/profile/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          const newAvatarUrl = response.data.data.avatar_url;
          // Update both temp and profile data
          setTempData((prev) => ({
            ...prev,
            avatar: newAvatarUrl,
          }));
          setProfileData((prev) => ({
            ...prev,
            avatar: newAvatarUrl,
          }));
        } else {
          setError(response.data.message || "Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Failed to upload image");
        }
      } finally {
        setIsUploadingImage(false);
      }
    }

    // Reset the file input
    event.target.value = "";
  };
  const handleImageClick = () => {
    if (isEditing) {
      setShowImageModal(true);
    }
  };

  const handleImageFromFile = () => {
    setShowImageModal(false);
    fileInputRef.current?.click();
  };
  const handleImageFromUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      // Basic URL validation
      try {
        new URL(url);

        // Test if the URL is a valid image
        const img = new Image();
        img.onload = () => {
          setTempData((prev) => ({
            ...prev,
            avatar: url,
          }));
        };

        img.onerror = () => {
          alert("Invalid image URL or image could not be loaded");
        };

        img.src = url;
      } catch (error) {
        alert("Please enter a valid URL");
      }
    }
    setShowImageModal(false);
  };
  const removeImage = () => {
    const defaultAvatar =
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
    setTempData((prev) => ({
      ...prev,
      avatar: defaultAvatar,
    }));
    setShowImageModal(false);
  };
  const handleNotificationChange = async (setting, value) => {
    try {
      const updatedSettings = {
        ...notificationSettings,
        [setting]: value,
      };

      const response = await api.put("/profile/notifications", updatedSettings);

      if (response.data.success) {
        setNotificationSettings(updatedSettings);
      } else {
        setError("Failed to update notification settings");
      }
    } catch (error) {
      console.error("Error updating notifications:", error);
      setError("Failed to update notification settings");
    }
  };

  const handlePasswordChange = async () => {
    const currentPassword = prompt("Enter your current password:");
    if (!currentPassword) return;

    const newPassword = prompt("Enter your new password:");
    if (!newPassword) return;

    const confirmPassword = prompt("Confirm your new password:");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await api.put("/profile/password", {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      if (response.data.success) {
        alert("Password updated successfully");
      } else {
        setError(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update password");
      }
    }
  };

  const toggle2FA = async () => {
    try {
      const endpoint = profileData.two_factor_enabled
        ? "/profile/2fa/disable"
        : "/profile/2fa/enable";
      const response = await api.post(endpoint);

      if (response.data.success) {
        setProfileData((prev) => ({
          ...prev,
          two_factor_enabled: !prev.two_factor_enabled,
        }));
        setTempData((prev) => ({
          ...prev,
          two_factor_enabled: !prev.two_factor_enabled,
        }));
      } else {
        setError(response.data.message || "Failed to update 2FA settings");
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      setError("Failed to update 2FA settings");
    }
  };

  const ProfileField = ({ label, value, field, type = "text", icon: Icon }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Icon size={16} />
        {label}
      </label>
      {isEditing ? (
        <input
          type={type}
          value={tempData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      ) : (
        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{value}</p>
      )}
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        activeTab === id
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
          : "text-gray-600 hover:bg-white/50"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 mt-16">
      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-medium text-gray-900">
                Loading profile...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-red-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="flex-1">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-white hover:bg-red-600 rounded-lg p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <img
                  src={tempData.avatar}
                  alt="Current profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Camera size={16} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Update Profile Picture
              </h3>
              <p className="text-gray-600">
                Choose how you'd like to update your profile picture
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleImageFromFile}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <Upload size={20} />
                Upload from Device
              </button>
              <button
                onClick={handleImageFromUrl}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <Link size={20} />
                Use Image URL
              </button>

              <button
                onClick={removeImage}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <X size={20} />
                Remove Picture
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowImageModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">👤</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Profile
                </h1>
                <p className="text-gray-600 text-sm">
                  Manage your account settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {" "}
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative group">
              <div
                className={`relative ${isEditing ? "cursor-pointer" : ""}`}
                onClick={handleImageClick}
              >
                {" "}
                <img
                  src={tempData.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white transition-all duration-300 group-hover:shadow-2xl"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                  }}
                />
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {isEditing && !isUploadingImage && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera size={24} className="text-white" />
                  </div>
                )}
              </div>

              {isEditing && (
                <>
                  {" "}
                  <button
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                    disabled={isUploadingImage}
                    title="Change profile picture"
                  >
                    <Camera size={18} className="text-white" />
                  </button>
                  {tempData.avatar !== profileData.avatar && (
                    <button
                      onClick={removeImage}
                      className="absolute top-0 left-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      title="Reset to original image"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  )}
                </>
              )}

              {profileData.verified && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle size={16} className="text-white" />
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                {profileData.superHost && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Award size={14} />
                    Super Host
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {profileData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Joined{" "}
                  {new Date(profileData.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>

              <p className="text-gray-700 mb-6 max-w-2xl">{profileData.bio}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {profileData.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {" "}
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex items-center gap-2 bg-gray-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex flex-wrap gap-2 mb-8">
            <TabButton id="profile" label="Profile Details" icon={User} />
            <TabButton id="reviews" label="Reviews" icon={Star} />
            <TabButton id="security" label="Security" icon={Shield} />
            <TabButton id="notifications" label="Notifications" icon={Bell} />
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField
                  label="First Name"
                  value={profileData.firstName}
                  field="firstName"
                  icon={User}
                />
                <ProfileField
                  label="Last Name"
                  value={profileData.lastName}
                  field="lastName"
                  icon={User}
                />
                <ProfileField
                  label="Email"
                  value={profileData.email}
                  field="email"
                  type="email"
                  icon={Mail}
                />
                <ProfileField
                  label="Phone"
                  value={profileData.phone}
                  field="phone"
                  type="tel"
                  icon={Phone}
                />
                <ProfileField
                  label="Location"
                  value={profileData.location}
                  field="location"
                  icon={MapPin}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                {isEditing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Recent Reviews
                </h3>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={20} />
                  <span className="text-xl font-bold text-gray-900">4.9</span>
                  <span className="text-gray-600">
                    ({recentReviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white/50 rounded-2xl p-6 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.guest}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {review.listing}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Security Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock size={24} className="text-blue-600" />
                    <h4 className="text-lg font-semibold">Password</h4>
                  </div>{" "}
                  <p className="text-gray-600 mb-4">
                    Last changed 3 months ago
                  </p>
                  <button
                    onClick={handlePasswordChange}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Change Password
                  </button>
                </div>

                <div className="bg-white/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} className="text-green-600" />
                    <h4 className="text-lg font-semibold">
                      Two-Factor Authentication
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {profileData.two_factor_enabled
                      ? "Two-factor authentication is enabled"
                      : "Add an extra layer of security"}
                  </p>
                  <button
                    onClick={toggle2FA}
                    className={`px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 text-white ${
                      profileData.two_factor_enabled
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  >
                    {profileData.two_factor_enabled
                      ? "Disable 2FA"
                      : "Enable 2FA"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Notification Preferences
              </h3>{" "}
              <div className="space-y-4">
                {[
                  {
                    key: "email_notifications",
                    label: "Email notifications",
                    description: "Receive updates via email",
                  },
                  {
                    key: "push_notifications",
                    label: "Push notifications",
                    description: "Get notified on your device",
                  },
                  {
                    key: "sms_notifications",
                    label: "SMS notifications",
                    description: "Receive text messages for urgent updates",
                  },
                  {
                    key: "marketing_emails",
                    label: "Marketing emails",
                    description:
                      "Get updates about new features and promotions",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[item.key] || false}
                        onChange={(e) =>
                          handleNotificationChange(item.key, e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
