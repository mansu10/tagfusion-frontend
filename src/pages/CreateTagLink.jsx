import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SigningStargateClient } from "@cosmjs/stargate";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { turaChainId, endpoint_rpc,tag_url } from "../config/config.js";

const CreateTagLink = () => {
   const [params, setParams] = useState({});
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   useEffect(() => {
      // 解析 URL 查询参数
      const queryParams = new URLSearchParams(window.location.search);
      const to_address = queryParams.get('to_address');
      const tag_version = queryParams.get('tag_version');
      const type = queryParams.get('type');
      const tag_name = queryParams.get('tag_name');
      const recognization = queryParams.get('recognization');

      setParams({
         to_address,
         tag_version,
         type,
         tag_name,
         recognization
      });

   }, [searchParams]);
   useEffect(() => {

      if (params.to_address) {
         sendTransaction(params);
      }

   }, [params]);

   const sendTransaction = async (params) => {
      const { to_address, tag_version, type, tag_name, recognization } = params;
      if (window.keplr) {
         await window.keplr.enable(turaChainId); // 替换为你的链 ID
      } else {
         toast.error("Please install the Keplr plug-in");
      }
      try {
         const chainId = turaChainId;
         if (!to_address) {
            toast.error("No address provided");
            return;
         }
         const denom = "utura";
         const toSend = "1000000";
         const offlineSigner = window.getOfflineSigner(chainId);
         const accounts = await offlineSigner.getAccounts();
         const address = accounts[0].address;
         const signingClient = await SigningStargateClient.connectWithSigner(
             endpoint_rpc,
             offlineSigner
         );
         const fee = {
            amount: [{ denom: "utura", amount: "500" }],
            gas: "200000",
         };
         const memo = JSON.stringify({
            tag_version: tag_version,
            type: type,
            tag_name: tag_name,
            recognization: recognization
         });
         const result = await signingClient.sendTokens(
             address,
             to_address,
             [
                {
                   denom: denom,
                   amount: toSend,
                },
             ],
             fee,
             memo
         );

         if (result.code !== undefined && result.code !== 0) {
            throw new Error(`Error: ${result.log || result.rawLog}`);
         }
         toast.success(`Transaction Successful: ${tag_name}`);
      } catch (error) {
         window.location.href = tag_url;
         if (error.message === "Invalid string. Length must be a multiple of 4") {
            toast.success(`Transaction Successful: ${tag_name}`);
         } else {
            toast.error(`Submit Error: ${error.message}`);
         }
      } finally {
         // Navigate to a different path or reset state
         window.location.href = tag_url;
      }
   }

};

export default CreateTagLink;
