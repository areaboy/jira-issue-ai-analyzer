import Resolver from '@forge/resolver';
import api, { route } from "@forge/api";
import { storage, startsWith, fetch} from '@forge/api';


const resolver = new Resolver();

resolver.define('get-pageid', (req) => {

 //console.log('Account ID: ' +req.context.accountId);
//console.log('cloudId: ' +req.context.cloudId);
 //console.log('issue key: ' +req.context.extension.issue.key);
 //console.log('issue id: ' +req.context.extension.issue.id);
 

  //return JSON.stringify(req);
//return req.context.extension.issue.key;
return req.context.extension.issue.key;
});


resolver.define('getpagecontent-methodx', async (req) => { 

// Get issue Page key
const pageId = req.context.extension.issue.key;

//Get issue description Page Content
	 	const response = await api.asApp().requestJira(route`/rest/api/3/issue/${pageId}?fields=summary,description`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  

console.log(`Response: ${response.status} ${response.statusText}`);
const data = (await response.json()).fields;

console.log('Display Issues description now');
//console.log(data);
//console.log(data.summary);
//console.log(data.description);
//console.log('description: ' +data.description.content[0].content[0].text);

//console.log('stt-data:' +JSON.stringify(data));
return data.description.content[0].content[0].text;
 
});



// submit ExpertAI and ChatGPT Credentials to Forge Storage

//resolver.define('form-accesstoken', async (req) => {
resolver.define('form-accesstoken', async ({ payload}) => {
 
const addx =  await storage.setSecret('accesstokenkeys2023', payload);	 
//const data1 = await storage.get('accesstokenkeys2023');
//return data1;
const resx_data ='Data-Submitted-Successfully';
return resx_data;

});





// Generate Access Token for Expert.AI and save to Forge Storage

resolver.define('form-accesstoken2', async ({ payload}) => {
 
const addx2 =  await storage.setSecret('expertaiaccesstokenkeys2023', payload);	 ;
const resx_data2 ='Access-Token-Generated-Successfully';
return resx_data2;

});


// Get Expert AI and ChatGPT Credentials stored in Forge API Storage

resolver.define('getaccesstokenresult-methodx', async (req) => { 
const data3 = await storage.getSecret('accesstokenkeys2023');

//console.log(data3);
return data3;

});


// Get Expert AI Access Token stored in Forge API Storage

resolver.define('getaccesstokenresult-methodx2', async (req) => { 
const data4 = await storage.getSecret('expertaiaccesstokenkeys2023');

//console.log(data4);
return data4;

});

export const handler = resolver.getDefinitions();



