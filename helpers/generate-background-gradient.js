import Colors from '../services/colors';

export default function ({ image, title }) {
  const averageColor = image ? image.averageColor : null;

  return averageColor
    ? Colors.RGBToGradient(...averageColor)
    : Colors.stringToHEXGradient(title);
}
