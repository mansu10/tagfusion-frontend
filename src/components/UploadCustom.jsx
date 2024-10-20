const UploadCustom = () => {
  return (
    <div className="custom-upload">
      <div>
        <div className="flex items-center p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <label
            htmlFor="uploadPic"
            className="p-2 text-blue-700 border border-gray-600 rounded-md cursor-pointer bg-white hover:bg-blue-50 font-semibold font-sans"
          >
            Select
            <input
              type="file"
              id="uploadPic"
              className="hidden"
            />
          </label>
         
        </div>
      </div>
    </div>
  );
}