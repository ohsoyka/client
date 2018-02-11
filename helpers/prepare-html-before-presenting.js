export default function (html) {
  return html
    .replace(/<p>(<img .*?)<\/p>/g, '$1') // unwrap img tags
    .replace(/<blockquote>\s*<p>(.*?)<\/p>\s*<\/blockquote>/g, '<blockquote>$1</blockquote>'); // unwrap blockquote tags
}
