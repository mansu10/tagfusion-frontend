import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/customStyles.css"; // 引入自定义CSS文件

import {
  InputCustom,
  UploadCustom,
  CheckBoxCustom,
} from "../components/FormItems";
import TFButton from "../components/TFButton";

const PageRegister = () => {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");
  const [uploadPic, setUploadPic] = useState(null); // 存储单张上传的图片
  const [check, setCheck] = useState(false);

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
      if (!address) {
        toast.error("Please connect wallet");
        return;
      }

      if (!nickname) {
        toast.error("Please add user name");
        return;
      }
      if (!bio) {
        toast.error("Please add bio");
        return;
      }
      if (!check) {
        toast.error("Please agree Service & Privacy Policy");
        return;
      }
      // 显示正在创建中的提示
      //       toast.info("Creating...", {
      //          position: "top-center", // 设置位置为右上角
      //          autoClose: false,
      //          hideProgressBar: true,
      //          closeOnClick: false,
      //          pauseOnHover: false,
      //          draggable: false,
      //          progress: undefined,
      //          theme: "colored",
      //          type: "info",
      //          icon: false,
      //          style: {
      //             backgroundColor: "yellow",
      //             color: "black",
      //             border: "2px solid #BE7123", // 设置边框
      //             borderRadius: "8px", // 设置边框圆角
      //             left: "50%", // 调整位置
      //             transform: "translateX(50%)" // 水平居中偏移
      //          }
      //       });

      // 显示正在创建中的提示
      toast.info("Creating...", {
        position: "top-right", // 设置位置为右上角
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        type: "info",
        icon: false,
      });

      const response = await axiosInstance.post(
        "/tagfusion/api/create_info/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 关闭正在创建中的提示
      toast.dismiss();

      if (response.data.code === 0) {
        navigate("/my"); // 表单提交成功后重定向到 /card 页面
        localStorage.setItem("tura_login_status", true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.dismiss(); // 关闭正在创建中的提示
      toast.error("Error submitting form.");
    }
  };
  return (
    <>
      <div className=" flex flex-col items-center pt-[176px] px-[20px]">
        <div className="text-txtgreen text-[24px] md:text-[48px]">
          Create My Tagfusion Card
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[28px] gap-y-[45px] w-full md:w-[804px] mt-[98px]">
          <div>
            <InputCustom
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              label="User Name*"
            ></InputCustom>
          </div>
          <div>
            <InputCustom
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              label="Bio*"
            ></InputCustom>
          </div>
          <div>
            <InputCustom
              label="Address"
              value={address}
              readonly={true}
            ></InputCustom>
          </div>
          <div>
            <InputCustom
              value={link}
              onChange={(e) => setLink(e.target.value)}
              label="Link*"
            ></InputCustom>
          </div>
          <div className="md:col-span-2">
            <UploadCustom
              uploadPic={uploadPic}
              onChange={(e) => setUploadPic(e.target.files[0])}
            ></UploadCustom>
            <div className="flex flex-col md:flex-row justify-between mt-[56px]">
              <div className=" text-white flex items-start leading-[22px] text-[16px]">
                <div className="h-[22px] mt-[1px]">
                  <CheckBoxCustom
                    value={check}
                    onChange={(e) => {
                      setCheck(e.target.checked);
                    }}
                  ></CheckBoxCustom>
                </div>
                <div className="ml-[16px]">
                  I have read and accept the Terms of
                  <br />
                  <span className="text-[#8AE288FF]">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      href="https://tagfusion.gitbook.io"
                    >
                      Service & Privacy Policy
                    </a>
                    *
                  </span>
                </div>
              </div>
              <TFButton
                onClick={handleSubmit}
                className="px-[80px] mt-[20px] md:mt-0 leading-[20px]"
              >
                Create
              </TFButton>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default PageRegister;
