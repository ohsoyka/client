import Colors from '../services/colors';

export default function ({ image, title }) {
  const { averageColor } = image;
  return averageColor
    ? Colors.RGBToGradient(...averageColor)
    : Colors.stringToHEXGradient(title);
}
