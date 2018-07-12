"use strict";

function highlightHTML(inp = 'body', options = {}) {

  let settings = Object.assign({
    mode: 'append', //return
    output: 'body',
    inputType: 'selector', //manual
    tagClass: 'tag',
    valueClass: 'val',
    attrClass: 'attr',
  }, options);

  let output = settings.output,
      input;

  let mode = settings.mode;

  if (settings.inputType === 'selector') {
    input = document.querySelector(inp).outerHTML;

  } else if (settings.inputType === 'manual') {
    input = inp;
  } else {
    throw new Error("inputType is not valid. Use 'selector' (default) or 'manual'.");
  }

  if (settings.mode === 'append') {
    output = document.querySelector(output);
  }

  let tagClass   = settings.tagClass,
      valueClass = settings.valueClass,
      attrClass  = settings.attrClass;

  if (tagClass === 'tag' || valueClass === 'val' || attrClass === 'attr') {
    let style = document.querySelector('style') || document.createElement('style');
    let css = `.tag {
                  font-weight: bold;
                  color: #A7413E;
                }
                .attr {
                  color: #D2945D;
                }
                .val {
                  color: #90C362;
                }`;

    css = document.createTextNode(css);
    style.appendChild(css);
    document.querySelector('head').appendChild(style);
  }

  let typeOptions = 'class|id|data[-\\w]+|data|name|value|href|src|rel|alt|style|title|disabled|placeholder|required|selected|type';

  let tagBegin = /<\s?(\w*)\s?>/gi,
      tagEnd = /<\s?(\/\w*)\s?>/gi,
      classId = new RegExp (`<\\s?(\\w*)\\s((?:${typeOptions})\\s?=?\\s?"[\\w\\s-]*>?")*`, 'gi'),
      hlStrings = new RegExp(`(<\\s?span class\\s?=\\s?"${tagClass}"\\s?>[\\w-\\s]+<\\s?/span\\s?>\\s*)(${typeOptions})\\s?=?\\s?("[\\w-\\s]+")?`, 'ig'),
      hlStringsMultiple = new RegExp(`(<\\s?span class\\s?=\\s?"${valueClass}"\\s?>"[\\w-\\s]+"<\\s?\/span\\s?>\\s*)(${typeOptions})\\s?=?\\s?("[\\w-\\s]+")?`, 'ig')


  let outputHTML = input.replace(tagBegin, '<$1>&lt;$1&gt;'); //<div>
      outputHTML = outputHTML.replace(tagEnd, '&lt;$1&gt;<$1>'); //</div>
      outputHTML = outputHTML.replace(classId, '<$1 $2>&lt;$1 $2'); //<div class ...>

  //Highlight
  //tags
  outputHTML = outputHTML.replace(/&lt;(\s?\/?\s?\w+)(\s*)/gi, `&lt;<span class="${tagClass}">$1</span>$2`); //<div ...>
  //strings
  outputHTML = outputHTML.replace(hlStrings, `$1<span class="${attrClass}">$2</span>=<span class="${valueClass}">$3</span>`);
  //multiple strings
  for (let j = 1; j <= 5; j++) {
    outputHTML = outputHTML.replace(hlStringsMultiple, `$1<span class="${attrClass}">$2</span>=<span class="${valueClass}">$3</span>`);
  }

  //Output
  if (mode === 'append') {
    output.innerHTML = outputHTML;
  } else {
    return outputHTML;
  }
}