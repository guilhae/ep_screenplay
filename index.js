const eejs = require('ep_etherpad-lite/node/eejs/');
const Changeset = require('ep_etherpad-lite/static/js/Changeset');
const settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_editbarMenuLeft = (hookName, args, cb) => {
  if (args.renderContext.isReadOnly) return cb();

  for (const button of ['scene', 'action', 'character', 'dialogue']) {
    if (JSON.stringify(settings.toolbar).indexOf(button) > -1) {
      return cb();
    }
  }

  args.content += eejs.require('ep_screenplay/templates/editbarButtons.ejs');
  return cb();
};


exports.padInitToolbar = (hookName, args, cb) => {
  const toolbar = args.toolbar;

  const sceneButton = toolbar.button({
    command: 'scene',
    localizationId: 'ep_screenplay.toolbar.scene.title',
    class: 'buttonicon buttonicon-video-1 ep_screenplay ep_scene',
  });

  const actionButton = toolbar.button({
    command: 'action',
    localizationId: 'ep_screenplay.toolbar.action.title',
    class: 'buttonicon buttonicon-megaphone ep_screenplay ep_action',
  });

  const characterButton = toolbar.button({
    command: 'character',
    localizationId: 'ep_screenplay.toolbar.character.title',
    class: 'buttonicon buttonicon-child ep_screenplay ep_character',
  });

  const dialogueButton = toolbar.button({
    command: 'dialogue',
    localizationId: 'ep_screenplay.toolbar.dialogue.title',
    class: 'buttonicon buttonicon-comment ep_screenplay ep_dialogue',
  });

  toolbar.registerButton('scene', sceneButton);
  toolbar.registerButton('action', actionButton);
  toolbar.registerButton('character', characterButton);
  toolbar.registerButton('dialogue', dialogueButton);

  return cb();
};

exports.stylesForExport = function(hook, padId, cb){
  cb(".porra{background-color: red !important}");
}

exports.expressConfigure = function(hookName, context){
  console.log('ep_screenplay está instalado!');
}
