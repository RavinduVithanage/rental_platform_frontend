import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Calendar, Camera, Edit3, Save, X, 
  Star, Award, TrendingUp, Eye, Heart, MessageCircle, Shield, 
  Bell, Lock, CreditCard, Settings, CheckCircle, AlertCircle,
  Upload, Facebook, Twitter, Instagram, Linkedin
} from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+94 77 123 4567',
    location: 'Colombo, Sri Lanka',
    bio: 'Passionate traveler and property enthusiast. I love sharing unique spaces and creating memorable experiences for guests from around the world.',
    joinDate: '2022-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    languages: ['English', 'Sinhala', 'Tamil'],
    verified: true,
    superHost: true
  });

  const [tempData, setTempData] = useState(profileData);

  const stats = [
    { label: 'Total Listings', value: '12', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Reviews', value: '89', icon: Star, color: 'from-purple-500 to-pink-500' },
    { label: 'Response Rate', value: '98%', icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Profile Views', value: '1.2k', icon: Eye, color: 'from-orange-500 to-red-500' }
  ];

  const recentReviews = [
    {
      id: 1,
      guest: 'Michael Chen',
      rating: 5,
      comment: 'Amazing host! The villa was exactly as described and Sarah was very responsive.',
      date: '2024-06-15',
      listing: 'Beachfront Villa in Mirissa'
    },
    {
      id: 2,
      guest: 'Emma Wilson',
      rating: 5,
      comment: 'Beautiful mountain retreat with stunning views. Highly recommend!',
      date: '2024-06-10',
      listing: 'Mountain Retreat in Ella'
    },
    {
      id: 3,
      guest: 'David Kumar',
      rating: 4,
      comment: 'Great location and clean property. Sarah was very helpful throughout.',
      date: '2024-06-05',
      listing: 'City Apartment in Colombo'
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const ProfileField = ({ label, value, field, type = 'text', icon: Icon }) => (
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
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
          : 'text-gray-600 hover:bg-white/50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 mt-16">
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
                <p className="text-gray-600 text-sm">Manage your account settings</p>
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
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <Camera size={18} className="text-white" />
                </button>
              )}
              {profileData.verified && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle size={16} className="text-white" />
                </div>
              )}
            </div>

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
                  Joined {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 max-w-2xl">{profileData.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {profileData.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
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
          {activeTab === 'profile' && (
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
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{profileData.bio}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Recent Reviews</h3>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={20} />
                  <span className="text-xl font-bold text-gray-900">4.9</span>
                  <span className="text-gray-600">({recentReviews.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="bg-white/50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.guest}</h4>
                        <p className="text-sm text-gray-600">{review.listing}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock size={24} className="text-blue-600" />
                    <h4 className="text-lg font-semibold">Password</h4>
                  </div>
                  <p className="text-gray-600 mb-4">Last changed 3 months ago</p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300">
                    Change Password
                  </button>
                </div>

                <div className="bg-white/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} className="text-green-600" />
                    <h4 className="text-lg font-semibold">Two-Factor Authentication</h4>
                  </div>
                  <p className="text-gray-600 mb-4">Add an extra layer of security</p>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', description: 'Receive updates via email' },
                  { label: 'Push notifications', description: 'Get notified on your device' },
                  { label: 'SMS notifications', description: 'Receive text messages for urgent updates' },
                  { label: 'Marketing emails', description: 'Get updates about new features and promotions' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
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