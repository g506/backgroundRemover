import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActionStatus } from "../features/removeBackground";
import loadImage from "blueimp-load-image";

export default function ChangeBackground() {
  // const status = useSelector((state) => state.status.bgRemoved);
  // const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  let blob = null;
  console.log(status)
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);

  const imgUpload = (e) => {
    const img = e.target.files[0];
    var input = document.getElementById("uploadChangeBg");
    var infoArea = document.getElementById("uploadChangeBg-label");
    var fileName = input.files[0].name;
    infoArea.textContent = "File name: " + fileName;

    setImage(img);
  };

  const imgUpload1 = (e) => {
    const img = e.target.files[0];
    var input = document.getElementById("uploadChangeBg1");
    var infoArea = document.getElementById("uploadChangeBg1-label");
    var fileName = input.files[0].name;
    infoArea.textContent = "File name: " + fileName;

    setImage1(img);
  };


  const uploadImage = async () => {
    // dispatch(setActionStatus(false));

    const resizedImage = await loadImage(image, {
      // resize before sending to Remove.bg for performance
      maxWidth: 1500,
      maxHeight: 1500,
      canvas: true,
    });

    const resizedImage1 = await loadImage(image1, {
      maxWidth: 1500,
      maxHeight: 1500,
      canvas: true,
    });

    const formData = new FormData();

    resizedImage.image.toBlob(async function (inputBlob) {
      formData.append("image_file", inputBlob);
    });

    resizedImage1.image.toBlob(async function (inputBlob1) {
      formData.append("image_file1", inputBlob1);
    });

    console.log(formData)
    handleResponse(formData);
  };

  const handleResponse = async (formData) => {
    const response = await fetch("http://20.161.17.235:5000/changeBg", {
      method: "POST",
      headers: {
        "X-Api-Key": "Rn1PbjhV5MbZvVahFJ7jfzoh",
      },
      body: formData,
    });

    if (response.status === 200) {
      setStatus(true)
    } else {
      setStatus(false)
    }

    const outputBlob = await response.blob();

    blob = URL.createObjectURL(outputBlob);
    const image = document.getElementById("imageChangeResult");
    const down = document.getElementById("downChange");
    image.src = blob;
    down.href = blob;
    down.download = "save.jpg";
  }

  return (
    <div className="row py-4">
      <div className="col-lg-6 mx-auto text-center">
        <h3 style={{ color: 'white' }}>Change Image Background</h3>
        <p>Choose Original Image</p>
        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
          <input
            id="uploadChangeBg"
            type="file"
            onChange={imgUpload}
            className="form-control border-0"
          />
          <label
            id="uploadChangeBg-label"
            for="uploadChangeBg"
            className="font-weight-light text-muted"
          >
            Choose file
          </label>

          <div className="input-group-append">
            <label for="uploadChangeBg" className="btn btn-light m-0 rounded-pill px-4">
              {" "}
              <i className="fa fa-cloud-upload mr-2 text-muted"></i>
              <small className="text-uppercase font-weight-bold text-muted">
                Choose file
              </small>
            </label>
          </div>
        </div>
        <p>Choose Background Image:</p>
        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
          <input
            id="uploadChangeBg1"
            type="file"
            onChange={imgUpload1}
            className="form-control border-0"
          />
          <label
            id="uploadChangeBg1-label"
            for="uploadChangeBg1"
            className="font-weight-light text-muted"
          >
            Choose file
          </label>
          <div className="input-group-append">
            <label for="uploadChangeBg1" className="btn btn-light m-0 rounded-pill px-4">
              {" "}
              <i className="fa fa-cloud-upload mr-2 text-muted"></i>
              <small className="text-uppercase font-weight-bold text-muted">
                Choose file
              </small>
            </label>
          </div>
        </div>
        <button
          className="btn btn-outline-light remove-button"
          onClick={uploadImage}
        >
          Change Background
        </button>
        <div>
          <div className="row py-4">
            <div className="col-lg-6 mx-auto text-center">
              <p className="font-italic text-white text-center">
                The result will be rendered inside the box below.
              </p>
              <div className="image-area mt-4 justify-content-center">
                {status === false ? (
                  <div class="lds-roller mb-3">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <img
                    id="imageChangeResult"
                    src="#"
                    alt=""
                    className="img-fluid rounded shadow-sm mx-auto d-block"
                  />
                )}{" "}
              </div>
              {status ? (
                <a id="downChange">
                  <button className="btn btn-light down-button">
                    {" "}
                    <i className="fas fa-download" /> Download
                  </button>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
