import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadPicture = ({setProfileImage}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [url, setUrl] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/posts/addImages', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            setUrl(data.url);
            if (setProfileImage) {
                setProfileImage(data.url);
            }
            setImageLoading(false);
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            const data = await res.json();
            // a real app would probably use more advanced
            // error handling
            alert(data.errors);
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className="image-upload-container">
            {url && <img alt='' src={url} />}
            <div className="image-upload-form-container">
                <h3>Upload Your Image:</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        id='file-upload'
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <button className="upload-picture-button" type="submit">Upload</button>
                    {(imageLoading) && <p>Loading...</p>}
                </form>
            </div>
        </div>

    )
}

export default UploadPicture;
