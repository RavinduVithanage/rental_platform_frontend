# User Profile API Documentation

This documentation provides details for all the user profile related API endpoints that can be used with your React frontend.

## Base URL

```
http://your-domain.com/api
```

## Authentication

All profile endpoints require authentication using Sanctum. Include the bearer token in the Authorization header:

```
Authorization: Bearer {token}
```

## User Profile Endpoints

### 1. Get User Profile

**GET** `/profile`

Returns the complete user profile data including statistics.

**Response:**

```json
{
    "success": true,
    "data": {
        "id": 1,
        "firstName": "Sarah",
        "lastName": "Johnson",
        "email": "sarah.johnson@email.com",
        "phone": "+94 77 123 4567",
        "location": "Colombo, Sri Lanka",
        "bio": "Passionate traveler and property enthusiast...",
        "joinDate": "2022-03-15",
        "avatar": "http://domain.com/storage/avatars/avatar.jpg",
        "languages": ["English", "Sinhala", "Tamil"],
        "verified": true,
        "superHost": true,
        "roles": ["user"],
        "notification_settings": {
            "email_notifications": true,
            "push_notifications": true,
            "sms_notifications": false,
            "marketing_emails": true
        },
        "two_factor_enabled": false,
        "response_rate": 98,
        "profile_views": 1200,
        "created_at": "2022-03-15T10:30:00.000000Z",
        "updated_at": "2024-07-13T06:45:00.000000Z"
    },
    "stats": {
        "total_listings": 12,
        "total_reviews": 89,
        "average_rating": 4.9,
        "response_rate": "98%",
        "profile_views": "1.2k"
    },
    "message": "Profile retrieved successfully"
}
```

### 2. Update User Profile

**PUT** `/profile`

Updates user profile information.

**Request Body:**

```json
{
    "first_name": "Sarah",
    "last_name": "Johnson",
    "email": "sarah.johnson@email.com",
    "phone": "+94 77 123 4567",
    "location": "Colombo, Sri Lanka",
    "bio": "Updated bio text...",
    "languages": ["English", "Sinhala", "Tamil"]
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        // Updated user profile data
    },
    "message": "Profile updated successfully"
}
```

### 3. Change Password

**PUT** `/profile/password`

Updates user password.

**Request Body:**

```json
{
    "current_password": "current_password",
    "password": "new_password",
    "password_confirmation": "new_password"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Password updated successfully"
}
```

### 4. Get User Statistics

**GET** `/profile/stats`

Returns user statistics for dashboard display.

**Response:**

```json
{
    "success": true,
    "data": {
        "total_listings": 12,
        "total_reviews": 89,
        "average_rating": 4.9,
        "response_rate": "98%",
        "profile_views": "1.2k"
    },
    "message": "User statistics retrieved successfully"
}
```

### 5. Get User Reviews

**GET** `/profile/reviews`

Returns recent reviews for user's rental items.

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "guest": "Michael Chen",
            "rating": 5,
            "comment": "Amazing host! The villa was exactly as described...",
            "date": "2024-06-15",
            "listing": "Beachfront Villa in Mirissa"
        },
        {
            "id": 2,
            "guest": "Emma Wilson",
            "rating": 5,
            "comment": "Beautiful mountain retreat with stunning views...",
            "date": "2024-06-10",
            "listing": "Mountain Retreat in Ella"
        }
    ],
    "message": "Reviews retrieved successfully"
}
```

### 6. Upload Avatar

**POST** `/profile/avatar`

Uploads a new profile avatar image.

**Request Body:** (FormData)

-   `avatar`: Image file (jpeg, png, jpg, gif, max 2MB)

**Response:**

```json
{
    "success": true,
    "data": {
        "avatar_url": "http://domain.com/storage/avatars/new_avatar.jpg"
    },
    "message": "Avatar uploaded successfully"
}
```

### 7. Get Notification Settings

**GET** `/profile/notifications`

Returns current notification preferences.

**Response:**

```json
{
    "success": true,
    "data": {
        "email_notifications": true,
        "push_notifications": true,
        "sms_notifications": false,
        "marketing_emails": true
    },
    "message": "Notification settings retrieved successfully"
}
```

### 8. Update Notification Settings

**PUT** `/profile/notifications`

Updates notification preferences.

**Request Body:**

```json
{
    "email_notifications": true,
    "push_notifications": false,
    "sms_notifications": true,
    "marketing_emails": false
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "email_notifications": true,
        "push_notifications": false,
        "sms_notifications": true,
        "marketing_emails": false
    },
    "message": "Notification settings updated successfully"
}
```

### 9. Enable Two-Factor Authentication

**POST** `/profile/2fa/enable`

Enables two-factor authentication for the user.

**Response:**

```json
{
    "success": true,
    "message": "Two-factor authentication enabled successfully",
    "data": {
        "two_factor_enabled": true
    }
}
```

### 10. Disable Two-Factor Authentication

**POST** `/profile/2fa/disable`

Disables two-factor authentication for the user.

**Response:**

```json
{
    "success": true,
    "message": "Two-factor authentication disabled successfully",
    "data": {
        "two_factor_enabled": false
    }
}
```

## Frontend Integration Examples

### React Hook for Profile Data

```javascript
import { useState, useEffect } from "react";

const useProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.success) {
                setProfileData(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updateData) => {
        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();
            if (data.success) {
                setProfileData(data.data);
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }
        } catch (err) {
            return { success: false, error: "Failed to update profile" };
        }
    };

    return { profileData, loading, error, updateProfile, fetchProfile };
};
```

### Avatar Upload Example

```javascript
const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
        const response = await fetch("/api/profile/avatar", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            // Update avatar in state
            setProfileData((prev) => ({
                ...prev,
                avatar: data.data.avatar_url,
            }));
            return { success: true };
        } else {
            return { success: false, error: data.message };
        }
    } catch (err) {
        return { success: false, error: "Failed to upload avatar" };
    }
};
```

## Error Handling

All endpoints return consistent error responses:

```json
{
    "success": false,
    "message": "Error description",
    "error": "Detailed error message"
}
```

Common HTTP status codes:

-   `200`: Success
-   `422`: Validation Error
-   `401`: Unauthorized
-   `500`: Server Error

## Validation Rules

### Profile Update

-   `first_name`: Optional, string, max 255 characters
-   `last_name`: Optional, string, max 255 characters
-   `email`: Optional, valid email, unique
-   `phone`: Optional, string, max 20 characters
-   `location`: Optional, string, max 255 characters
-   `bio`: Optional, string, max 1000 characters
-   `languages`: Optional, array of strings

### Password Update

-   `current_password`: Required
-   `password`: Required, confirmed, meets password requirements
-   `password_confirmation`: Required, must match password

### Avatar Upload

-   `avatar`: Required, image file (jpeg, png, jpg, gif), max 2MB
