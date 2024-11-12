import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, ImageList, ImageListItem } from "@mui/material";

import { client, paths, queries } from "../utilities/config/api"


const PhotosApp = () => {
    const photosQuery = useQuery(queries.query(paths.getPhotos));

    return ({
        pending: "Uninitialized...",
        loading: "Loading Photos...",
        success: <PhotosAppContent files={photosQuery.data?.files} />,
        error: "Something went wrong..."
    }[photosQuery.status]);
}

export default PhotosApp

function _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}


const PhotosAppContent = ({ files }: { files: string[] }) => {

    const [imageData, setImageData] = useState<string[] | null>(null);

    useEffect(() => {

        if (files) {
            (async () => {
                const images = await Promise
                    .all(files
                        .map(async (name: string) => _arrayBufferToBase64((await client.get(paths.getImage + `/${name}`)).data.data))
                    );
    
                console.log({ images })

                setImageData(images);
            })();
        }

    }, []);

    return !imageData ? "Loading..." : (
        <div>
            <h1>Photos</h1>
            <PhotoMasonry imageData={imageData} />
            {/* <ul>
                {imageData.map((base64String: string, index: number) => (
                    <li key={index}>
                        <img src={`data:image/jpeg;base64,${base64String}`} alt="server file" style={{ width: "200px" }} />
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

const PhotoMasonry = ({ imageData }: { imageData: string[] }) => {
    return (
        <Box sx={{ width: "100vw", height: "auto", overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {imageData.map((base64String: string, index: number) => (
                <ImageListItem key={index}>
                    <LazyLoadImage
                        srcSet={`data:image/jpeg;base64,${base64String}`}
                        src={`data:image/jpeg;base64,${base64String}`}
                        alt={"title content"}
                        effect="blur"
                        width={400}
                        loading="lazy"
                    />
                </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}