import { useState, useEffect } from "react";
import { fetchApiByUrl, generateProject } from "../api/index";
import PanelBox from "../components/PanelBox";
import {
  InputCustom,
  TextareaCustom,
  UploadCustom,
  SelectCustom,
} from "../components/FormItems";
import TFButton from "../components/TFButton";
import ModalChainData from "../components/ModalChainData";
import { ToastContainer, toast } from "react-toastify";
const PageChain = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    url: "https://api-mainnet.magiceden.dev/v2/wallets/EBYYDbav6QgAM7JgYJcJgSKDgDvV8edgYJH5QmaAtZ6N/tokens",
    method: "GET",
    data: "",
  });

  const [submitForm, setSubmitForm] = useState({
    project_name: "",
    tag_name: "",
    project_intro: "",
    api_url: "",
    data_content: "",
    request_parameters: "",
  });
  const [result, setResult] = useState();
  const [projectResult, setProjectResult] = useState({
    id: "",
    tag_name: "",
    project_name: "",
    project_intro: "",
    data_content: "",
  });

  const handleStep = (val) => {
    console.log(val);
    setStep(val || 0);
  };

  const updateForm = (updateForm) => {
    const obj = Object.assign({}, form, updateForm);
    setForm(obj);
  };

  const handleSubmit = () => {
    console.log(form);
    // check if url is valid
    const reg = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!form.url || !reg.test(form.url)) {
      toast.error("please provide a valid api");
      return;
    }

    fetchLink(form);
  };

  const fetchLink = (form) => {
    fetchApiByUrl(form).then((res) => {
      console.log(res);
      const { code, data } = res.data;
      if (code === 0) {
        setResult(data);
        try {
          const jsonStr = JSON.stringify(data);
          setResult(jsonStr);
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error(data.message);
      }
    });
  };

  const updateSubmitForm = (updateForm) => {
    const obj = Object.assign({}, submitForm, updateForm);
    setSubmitForm(obj);
  };

  const handleSubmitProject = () => {
    console.log(submitForm);
    if (
      !submitForm.project_name ||
      !submitForm.tag_name ||
      !submitForm.project_intro
    ) {
      toast.error("Please fill up the blanks");
      return;
    }

    fetchSubmitProject();
  };

  const fetchSubmitProject = () => {
    const obj = {
      ...submitForm,
      api_url: form.url,
      data_content: result,
      request_parameters: "{}",
    };
    generateProject(obj).then((res) => {
      const { code, data } = res.data;
      if (code === 0) {
        toast.success("Project created successfully");
        setProjectResult(data);
        handleStep(2);
      } else {
        toast.error(data.message);
      }
      console.log(res);
    });
  };

  return (
    <div className="flex justify-center pt-[100px] px-[18px] relative z-10">
      <PanelBox title="Create Your Tags" className="w-full">
        {step === 0 && (
          <QueryForm
            form={form}
            updateForm={updateForm}
            onSubmmit={handleSubmit}
            result={result}
            onStepClick={handleStep}
          ></QueryForm>
        )}
        {step === 1 && (
          <SubmitForm
            form={submitForm}
            updateForm={updateSubmitForm}
            onStepClick={handleStep}
            onSubmit={handleSubmitProject}
          ></SubmitForm>
        )}
        {step === 2 && <ProjectInfo result={projectResult}></ProjectInfo>}
      </PanelBox>
      <ToastContainer></ToastContainer>
    </div>
  );
};

const QueryForm = ({ form, updateForm, onSubmmit, result, onStepClick }) => {
  const optionList = [
    {
      value: "GET",
      title: "GET",
    },
    {
      value: "POST",
      title: "POST",
    },
  ];
  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <div className="flex">
            <div className="flex-1">
              <InputCustom
                label="enter the api endpoint"
                onChange={(e) => {
                  updateForm({
                    url: e.target.value,
                  });
                }}
                value={form.url}
              ></InputCustom>
            </div>
            <div className="flex-none ml-[6px]">
              <SelectCustom
                value={form.method}
                options={optionList}
                onChange={(e) => {
                  console.log(e);
                  updateForm({
                    method: e.target.value,
                  });
                }}
              ></SelectCustom>
            </div>
          </div>
          <div className="mt-[16px]">
            <TextareaCustom
              value={form.data}
              label="Enter other parameters (if any)"
              type="textarea"
              onChange={(e) => {
                updateForm({
                  data: e.target.value,
                });
              }}
            ></TextareaCustom>
          </div>
        </div>
        <div className="ml-[16px] leading-[16px]">
          <TFButton onClick={onSubmmit}>query</TFButton>
        </div>
      </div>
      {result && (
        <>
          <div className=" max-h-[300px] mt-[16px] p-[8px] bg-[#ffffff1a] overflow-scroll text-white break-words">
            {result}
          </div>
          <div className="flex mt-[6px]">
            <TFButton
              onClick={() => {
                onStepClick?.call(this, 1);
              }}
              className="py-[10px] leading-[14px]"
            >
              Confirm
            </TFButton>
          </div>
        </>
      )}
    </>
  );
};

const SubmitForm = ({ onStepClick, form, updateForm, onSubmit }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div>{/* <UploadCustom></UploadCustom> */}</div>
        <div className="mt-[16px]">
          <InputCustom
            label="Project Name"
            onChange={(e) => {
              updateForm({
                project_name: e.target.value,
              });
            }}
            value={form.project_name}
          ></InputCustom>
        </div>
        <div className="mt-[16px]">
          <InputCustom
            label="Tag Name"
            onChange={(e) => {
              updateForm({
                tag_name: e.target.value,
              });
            }}
            value={form.tag_name}
          ></InputCustom>
        </div>
        <div className="mt-[16px]">
          <TextareaCustom
            value={form.project_intro}
            label="Project Intro"
            type="textarea"
            onChange={(e) => {
              updateForm({
                project_intro: e.target.value,
              });
            }}
          ></TextareaCustom>
        </div>
      </div>
      <div className="flex mt-[6px]">
        <TFButton
          className="py-[10px] leading-[14px]"
          onClick={() => {
            onSubmit?.call();
          }}
        >
          Submit
        </TFButton>
        <TFButton
          className="py-[10px] ml-[6px] leading-[14px]"
          onClick={() => {
            onStepClick?.call(this, 0);
          }}
        >
          Back
        </TFButton>
      </div>
    </div>
  );
};

const ProjectInfo = ({result}) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="mt-[16px] p-[8px] overflow-scroll text-white break-words">
          Project Name: {result.project_name}
        </div>
        {/* <div className="mt-[8px] p-[8px] overflow-scroll text-white break-words">
          Tag Name:{result.tag_name}
        </div> */}
        <div className="mt-[8px] p-[8px] overflow-scroll text-white break-words">
          Project Intro:{result.project_intro}
        </div>
        <div className="flex mt-[6px]">
          <TFButton
            link={`/chainid/${result.id}`}
            className="py-[10px] leading-[14px]"
          >
            View Project
          </TFButton>
        </div>
      </div>
    </div>
  );
};

export default PageChain;
