type Payload = {
  textArea: HTMLTextAreaElement,
  symbol: Symbols,
};

enum Symbols {
  headSymbol = '### ',
  boldSymbol = '**',
  italicSymbol = '_',
  codeSymbol = '`',
  bulletSymbol = '- ',
  numberSymbol = '1. ',
  taskSymbol = '- [ ] ',
}

function addWordSymbol(p: Payload): string {
  const start: number = p.textArea.selectionStart;
  const end: number = p.textArea.selectionEnd;
  const r = p.textArea.value.slice(start, end);
  return p.textArea.value.replace(r, `${p.symbol}${r}${p.symbol}`);
}

function addLineSymbol(p: Payload): string {
  const start: number = p.textArea.selectionStart;
  const end: number = p.textArea.selectionEnd;
  const r = p.textArea.value.slice(start, end);
  return p.textArea.value.replace(r, p.symbol);
}

function addUrlSymbol(e: HTMLTextAreaElement): string {
  const start: number = e.selectionStart;
  const end: number = e.selectionEnd;
  return `${e.value.substring(0, start)
  }[${
    e.value.substring(start, end)
  }](url)${
    e.value.substring(end)}`;
}

const moveToLineStart = () => {
  const s = window.getSelection() as Selection;
  s.modify('move', 'backward', 'lineboundary');
};

function insertMarkup(element: string, action: string): string {
  const textArea = document.querySelector(`.label${element}`) as HTMLTextAreaElement;
  let finText: string = '';

  switch (action) {
    case 'heading':
      moveToLineStart();
      finText = addLineSymbol({ textArea, symbol: Symbols.headSymbol });
      break;
    case 'bold':
      finText = addWordSymbol({ textArea, symbol: Symbols.boldSymbol });
      break;
    case 'italic':
      finText = addWordSymbol({ textArea, symbol: Symbols.italicSymbol });
      break;
    case 'code':
      finText = addWordSymbol({ textArea, symbol: Symbols.codeSymbol });
      break;
    case 'link':
      finText = addUrlSymbol(textArea);
      break;
    case 'bullet':
      moveToLineStart();
      finText = addLineSymbol({ textArea, symbol: Symbols.bulletSymbol });
      break;
    case 'number':
      moveToLineStart();
      finText = addLineSymbol({ textArea, symbol: Symbols.numberSymbol });
      break;
    default:
      moveToLineStart();
      finText = addLineSymbol({ textArea, symbol: Symbols.taskSymbol });
      break;
  }
  textArea.focus();
  // textArea.setSelectionRange(start, end);
  // textArea.value = finText;
  return finText;
  // txtarea.selectionEnd = ( start == end )? (end + text.length) : end ;
}

export default insertMarkup;
