// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey,input, cleanInput,isPrintable,moveCaretToEnd  } from "../../util/io.js";

import pause from "../../util/pause.js";
import { typeSound } from "../../sound/index.js"
import say from "../../util/speak.js";




async function pokemon() {
  
  
	clear();
	say("BATTLE", 0.3, 0.8);
	await type('L o a d i n g. . . ');
	return new Promise(async resolve =>
	{
	  
	  
	  // game
	});
    

}



const stylesheets = ["pokemon"];
const templates = ["pokemon"];
export { templates,stylesheets };
export default pokemon;