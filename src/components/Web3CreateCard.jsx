import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {axiosInstance} from "../config/config";

const CustomForm = () => {
   const [nickname, setNickname] = useState("");
   const [bio, setBio] = useState("");
   const [address, setAddress] = useState("");
   const [link, setLink] = useState("");
   const [uploadPic, setUploadPic] = useState(null); // 存储单张上传的图片
   const navigate = useNavigate(); // 获取导航钩子

   useEffect(() => {
      const storedAddress = localStorage.getItem("tura_address");
      if (storedAddress) {
         setAddress(storedAddress);
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("username", nickname);
      formData.append("bio", bio);
      formData.append("address", address);
      formData.append("profile_image", uploadPic);
      formData.append("link", link);

      try {
         const response = await axiosInstance.post("/tagfusion/api/create_info", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         if(response.data.code === 0){
            navigate("/card"); // 表单提交成功后重定向到 /card 页面
         }
         localStorage.setItem("tura_login_status", true);
      } catch (error) {
         console.error("Error submitting form:", error);
      }
   };

   return (
       <div className="relative flex items-center justify-center min-h-screen">
          {/*<ParticleBackground />*/}
          <div
              className="relative flex flex-col md:flex-row w-[90%] max-w-[1024px] shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] bg-black bg-opacity-50"
              style={{ backdropFilter: "blur(5px)" }}
          >
             <div className="p-4 sm:p-6 flex flex-col gap-2 md:gap-5 relative justify-center w-full md:w-[80%] lg:w-[60%] border-b md:border-b-0 md:border-r border-[#B66624]">
                <Link
                    to="/"
                    className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center md:absolute top-4 cursor-pointer gradient-button rounded-full left-4 items-center"
                >
                   <img src="/icons/back-icon.svg" alt="" className="w-5 h-5" />
                </Link>

                <p className="text-[#F7D5B4] text-xl sm:text-3xl md:text-5xl font-extrabold leading-snug">
                   CLAIM MY FIRST WEB3 DID CARD
                </p>
             </div>
             <div className="flex flex-col my-2 md:my-10 p-4 sm:p-6 gap-4 w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="nickname">
                         Nickname
                      </label>
                      <input
                          type="text"
                          id="nickname"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                   </div>
                   <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="bio">
                         Bio
                      </label>
                      <input
                          type="text"
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                   </div>
                   <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="address">
                         Address
                      </label>
                      <input
                          type="text"
                          id="address"
                          value={address}
                          readOnly
                          className="p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-400"
                      />
                   </div>

                   <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="link">
                         Link
                      </label>
                      <input
                          type="text"
                          id="link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                   </div>

                   <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="uploadPic">
                         Upload Pic
                      </label>
                      <input
                          type="file"
                          id="uploadPic"
                          onChange={(e) => setUploadPic(e.target.files[0])}
                          className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                   </div>

                   <div className="flex items-center mt-4">
                      <div className="flex items-center justify-center">
                         <div className="h-24 w-24 rounded-lg flex items-center justify-center mr-4">
                            {uploadPic && (
                                <img
                                    src={URL.createObjectURL(uploadPic)}
                                    alt="Uploaded Pic"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            )}
                         </div>
                      </div>
                      <button
                          type="submit"
                          className="ml-40 px-4 py-2 ml-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                         Create
                      </button>
                   </div>
                </form>
             </div>
          </div>
       </div>
   );
};

export default CustomForm;
