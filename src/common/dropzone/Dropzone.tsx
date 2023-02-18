import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import DropImage from '../../shared/models/newCollection/imageFile.model';
import styles from './styles.module.scss';

interface RootProps {
  isDragAccept: boolean,
  isDragReject: boolean,
  isFocused: boolean
}

type BorderColor = '#00e676' | '#ff1744' | '#2196f3' | '#477c9c';

const getColor = (props: RootProps): BorderColor => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#477c9c';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: RootProps) => getColor(props)};
  border-style: dashed;
  background-color: #edeef9;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

interface DropzoneProps {
  setSelectedImage: (e: DropImage) => void,
  selectedImage: DropImage
}

const Dropzone = ({ setSelectedImage, selectedImage }: DropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFile = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    setSelectedImage(imageFile[0]);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop });

  return (
    <Box component="div" className={styles.root}>
      <Box component="div" className={styles.dragContainer}>
        <Container
          {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? <p><FormattedMessage id="app.collection.collection.image" /></p>
            : (
              <Typography variant="body1">
                <FormattedMessage id="app.collection.collection.image2" />
                <Box component="span">
                  <br />
                  <FormattedMessage id="app.collection.collection.image3" />
                  <Box component="span" className={styles.textLink}>
                    <FormattedMessage id="app.collection.collection.image4" />
                  </Box>
                </Box>
              </Typography>
            )}
        </Container>
      </Box>
      {selectedImage
        && (
        <Box
          component="img"
          src={selectedImage?.preview}
          width={262}
          height={160}
        />
        )}
    </Box>
  );
};

export default Dropzone;
