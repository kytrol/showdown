import { h } from 'preact';

const ImgBox = ({ image, alt, width, height, onClick }) => {
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
          onClick={onClick && onClick}
        />
      )}
    </div>
  );
};

const toCssRem = val => `${val / 10}rem`;

export default ImgBox;
