'use strict';

// All our tags are block elements, so we just return them.
const tags = ['scene', 'action', 'character', 'dialogue'];

exports.aceEditEvent = (hookName, context) => {
  // If it's not a click or a key event and the text hasn't changed then do nothing
  const cs = context.callstack;
  if (!(cs.type === 'handleClick') && !(cs.type === 'handleKeyEvent') && !(cs.docTextChanged)) {
    return false;
  }
  // If it's an initial setup event then do nothing..
  if (cs.type === 'setBaseText' || cs.type === 'setup') return false;
};

function repeat(func, times) {
    func();
    times && --times && repeat(func, times);
}

const indent = (context, nivel) => {
  context.ace.callWithAce((ace) => {
    if (nivel === 1){
      repeat(function () { ace.ace_doIndentOutdent(1); }, 16);
      context.documentAttributeManager.setAttributeOnLine(5,"bold",true);
      ace.ace_setAttributeOnSelection("capitalize",true);
    } else if (nivel === 3){
      repeat(function () { ace.ace_doIndentOutdent(0); }, 16);
      repeat(function () { ace.ace_doIndentOutdent(1); }, 3);
      ace.ace_setAttributeOnSelection("bold",false);
      ace.ace_doInsertPica();
    }
    ace.ace_focus();
  }, 'indent', true);
};

exports.aceDomLineProcessLineAttributes = (name, context) => {
  const cls = context.cls;
  const alignType = /(?:^| )align:([A-Za-z0-9]*)/.exec(cls);
  console.log(cls);
  console.log(alignType);
};

exports.aceInitialized = (hook, context) => {
  // Passing a level >= 0 will set a alignment on the selected lines, level < 0
  // will remove it
  function doInsertPica(level) {
    const rep = this.rep;
    const documentAttributeManager = this.documentAttributeManager;
    console.log(rep);
  }
const editorInfo = context.editorInfo;
  editorInfo.ace_doInsertPica = doInsertPica.bind(context);
  return;
};

exports.postToolbarInit = (hookName, context) => {
  const editbar = context.toolbar;
  editbar.registerCommand('scene', () => {
    indent(context, 1);
  });

  editbar.registerCommand('action', () => {
    indent(context, 0);
  });

  editbar.registerCommand('character', () => {
    indent(context, 3);
  });

  editbar.registerCommand('dialogue', () => {
    indent(context, 1);
  });

  return true;
};
