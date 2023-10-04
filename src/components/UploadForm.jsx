import React, { useState, useEffect, useRef } from "react";
import "./UploadForm.css";
import uuid4 from "uuid4";
import { useStateProvider } from "../context/StateContext";
import { Navigate } from "react-router-dom";
import { ethers } from "ethers";
import ReactLoading from "react-loading";
import UploadSuccess from "./UploadSuccess";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UploadForm() {
  let navigate = useNavigate();
  const [{ fileInfo, contract }, dispatch] = useStateProvider();
  const [uploadLoad, setUploadLoad] = useState(false);
  const [tick, setTick] = useState(false);
  console.log(fileInfo)

  useEffect(()=>{
    if (fileInfo == undefined) {
      console.log("Navigating");
      navigate("/");
      return(<>hello world</>)
    }

  },[fileInfo])

  

  const { name, size, type, lastModifiedDate } = fileInfo;

  const fileNameWithoutExtension = name.split(".").slice(0, -1).join(".");

  // Use useRef to store the docid
  const docidRef = useRef(uuid4());

  // Metadata JSON Object
  const metadata = `{
    "Name":"${name}",
    "Size":"${size}",
    "Type":"${type}",
    "LastModifiedDate":"${lastModifiedDate}",
    "Document ID":"${docidRef.current}"   
  }`;

  const parsedMetadata = JSON.parse(metadata);

  let md = "";
  for (const key in parsedMetadata) {
    if (parsedMetadata.hasOwnProperty(key)) {
      md += `${key}: ${parsedMetadata[key]}\n`;
    }
  }

  let confVal = 1;
  function handleConfidentiality(event) {
    confVal = parseInt(event.target.value);
  }

  // Hashing
  const metadataString = JSON.stringify(metadata);
  const hash = ethers.id(metadataString);

  // Upload function parameters
  const _identifier = docidRef.current;
  const _data = {
    Title: String(name),
    data: {
      MetaDataHash: hash,
      Name: String(name),
      Type: String(type),
      Size: String(size),
      LastModifiedDate: String(lastModifiedDate),
    },
    level: confVal,
  };

  const helperHome = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contract === undefined) {
      console.log("Warning");
      toast.warn("Wallet not connected", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setUploadLoad(true);
    try {
      const tx = await contract.upload(_identifier, _data);
      let trans = await tx.wait();

      trans.then(
        setUploadLoad(false),
        setTick(true),

        toast.success("Document upload Success", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
        setTimeout(helperHome, 3000)
      );
    } catch (err) {
      setUploadLoad(false);
      console.log(err);
    }
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    event.preventDefault();
    const el = document.createElement("textarea");
    el.value = docidRef.current;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    toast.info("Document ID Copied", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setCopySuccess(true);
  };

  return (
    <>
      <div className="main">
        <div className="heading--text">
          <h1 className="uploadform_h1">Document Details</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="uploadform">
            <label className="uploadform_label">Title</label>
            <input
              type="text"
              id="documenttitle"
              name="documenttitle"
              placeholder="Document title"
              className="uploadforminput"
              defaultValue={fileNameWithoutExtension}
            />

            <label htmlFor="description" className="uploadform_label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              className="descriptionbox"
              placeholder="Write about your Document"
            ></textarea>

            <label htmlFor="confidentiality" className="uploadform_label">
              Confidentiality Level
            </label>
            <select
              onChange={handleConfidentiality}
              id="confidentiality"
              name="confidentiality"
            >
              <option value="1">Top Secret</option>
              <option value="2">Secret</option>
              <option value="3">Public</option>
            </select>

            <label className="uploadform_label">Owner</label>
            <input
              type="text"
              id="ownedby"
              name="ownedby"
              placeholder="Who owns the Document?"
              className="uploadforminput"
            />

            <label htmlFor="metadata" className="uploadform_label">
              MetaData
            </label>
            <div>
              <pre className="metadata--pre">{md}</pre>
            </div>

            <label htmlFor="hash" className="uploadform_label">
              Hash of MetaData
            </label>
            <div>
              <pre className="metadata--pre">{hash}</pre>
            </div>
            <label htmlFor="documentID" className="uploadform_label">
              Document ID (Copy the Document ID to retrieve your Document in the
              future)
            </label>
            <div className="metadata--pre doc-id-container">
              <pre>{docidRef.current}</pre>
              <button className="copy-button" onClick={copyToClipboard}>
                <a className="copybutton-anchor">
                  <img src="copyicon_black.svg" className="copy-icon" />
                </a>
              </button>
            </div>
          </div>
          <Tooltip anchorSelect=".copybutton-anchor" place="top">
            Copy Document ID
          </Tooltip>
          <div>
            {!uploadLoad && !tick && (
              <input
                type="submit"
                value="Upload Metadata"
                className="uploadforminput"
              ></input>
            )}
            {uploadLoad && (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#33F8EF"}
                height={100}
                width={100}
                className="loader"
              />
            )}
            {tick && <UploadSuccess />}
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadForm;
