import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

function FormattedPreview({ html, wordLimit = 10, className}) {
  const getFirstWordsWithFormatting = () => {
    const cleanHtml = DOMPurify.sanitize(html);
    let wordCount = 0;
    let result = '';
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cleanHtml;
    
    const traverse = (node) => {
      if (wordCount >= wordLimit) return;
      
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.trim().split(/\s+/);
        for (const word of words) {
          if (wordCount >= wordLimit) break;
          result += (wordCount > 0 ? ' ' : '') + word;
          wordCount++;
        }
      } else {
        const tagName = node.tagName.toLowerCase();
        result += `<${tagName}${Array.from(node.attributes)
          .map(attr => ` ${attr.name}="${attr.value}"`)
          .join('')}>`;
        
        Array.from(node.childNodes).forEach(traverse);
        
        if (wordCount < wordLimit) {
          result += `</${tagName}>`;
        }
      }
    };
    
    Array.from(tempDiv.childNodes).forEach(traverse);
    
    if (wordCount >= wordLimit) {
      result += '...';
    }
    
    return result;
  };

  return (
    <div className="formatted-preview text-gray-600 dark:text-gray-300 text-sm mb-">
      {parse(getFirstWordsWithFormatting())}
    </div>
  );
}

export default FormattedPreview