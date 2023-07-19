import Image1 from '../assets/banner_1.jpg';
import Image2 from '../assets/banner_2.jpg';
import Image3 from '../assets/banner_3.jpg';

export interface ImageSource {
  default: string;
}

const images: ImageSource[] = [
  { default: Image1 },
  { default: Image2 },
  { default: Image3 },
];

export default images;
