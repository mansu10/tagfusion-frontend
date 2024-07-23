import React from 'react';
import '../assets/Avatar.css';

const UserAvatar = ({ username }) => {
    // 生成随机颜色
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.random() * 30; // 饱和度在70%-100%之间
        const lightness = 50 + Math.random() * 10; // 亮度在50%-60%之间
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

export default UserAvatar;
