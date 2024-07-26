// UserAvatar.js
import React from 'react';
import '../assets/Avatar.css';

export const UserAvatar = ({ username }) => {
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.random() * 30;
        const lightness = 50 + Math.random() * 10;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const initials = username.slice(0, 2).toUpperCase();
    const bgColor = getRandomColor();

    return (
        <div className="avatar" style={{ backgroundColor: bgColor }}>
            {initials}
        </div>
    );
};

export const UserAvatarBig = ({ username }) => {
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.random() * 30;
        const lightness = 50 + Math.random() * 10;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const initials = username.slice(0, 2).toUpperCase();
    const bgColor = getRandomColor();

    return (
        <div className="avatar w-28 h-28 bg-gray-200 rounded-full overflow-hidden" style={{ backgroundColor: bgColor }}>
            {initials}
        </div>
    );
};
