import { h } from 'preact';

const ImgBox = ({ image, alt, width, height }) => {
  const imgExists = image && image.medium;

  return (
    <div
      class='img-box'
      style={{ height: toCssRem(height), width: toCssRem(width) }}
    >
      {imgExists && (
        <img
          src={image.medium}
          width={width}
          height={height}
          alt={alt}
        />
      )}
    </div>
  );
};

const toCssRem = val => `${val / 10}rem`;

export default ImgBox;
