import React, {ReactNode, useCallback, useEffect, useState, Fragment} from 'react';
import {requestJira, invoke } from '@forge/bridge';
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';
import $ from 'jquery';
import Textfield from '@atlaskit/textfield';

import TextArea from '@atlaskit/textarea';
import Button from '@atlaskit/button/standard-button';
import ButtonGroup from '@atlaskit/button/button-group';

import InlineMessage from '@atlaskit/inline-message';
import LoaderImage from "./loader.gif";
import "./App.css";
import FormData from "form-data";

import { css, jsx } from '@emotion/react';

import noop from '@atlaskit/ds-lib/noop';
import { Box } from '@atlaskit/primitives';
import { Radio } from '@atlaskit/radio';

import { Label } from '@atlaskit/form';
import Select from '@atlaskit/select';



import { N20, N200 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

const panelStyles = css({
  display: 'flex',
  marginTop: token('space.200', '16px'),
  marginBottom: token('space.100', '8px'),
  padding: token('space.400', '32px'),
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  backgroundColor: token('color.background.neutral', N20),
  borderRadius: token('border.radius', '3px'),
  color: token('color.text.subtlest', N200),
  fontSize: '4em',
  fontWeight: 500,
});

export const Panel = ({
  children,
  testId,
}: {
  children: ReactNode;
  testId?: string;
}) => (
  <div css={panelStyles} data-testid={testId}>
    {children}
  </div>
);


//Get Information about Currently Login User
 const fetchAccountId = async () => {
const response = await requestJira(`/rest/api/3/myself`);
const identity = await response.json();
//console.log(identity);
const publicName =  identity.displayName;
//const emailAddress =  identity.emailAddress;
//const accountId =  identity.accountId;
//const self =  identity.self;
return identity.displayName;
//return identity; 
 };


const boldStyles = css({
  fontWeight: 'bold',
});

function App() {
	
  const [data, setData] = useState(null);
const [pagecontent, setPagecontent] = useState(null);
const [accesstokenresult, setAccesstokenresult] = useState({});
  const [accesstokenresult2, setAccesstokenresult2] = useState({});                                              

const [loading, setLoading] = useState(false);
const [loading1, setLoading1] = useState(false);
const [loadingt, setLoadingt] = useState(false);
const [loadingt2, setLoadingt2] = useState(false);
const [loading2, setLoading2] = useState(false);
const [loading3, setLoading3] = useState(false);
const [loading4, setLoading4] = useState(false);
const [loading5, setLoading5] = useState(false);


const [accounts] = useState(fetchAccountId);
const [pubname, setPubname] = useState(null);
const [formState, setFormState] = useState(undefined);
const [tokenx, setTokenx] = useState(null);
const [tokenx2, setTokenx2] = useState(null);

  // Add Expert.AI and ChatGPT AI Access Token to Forge Storage 
//const onSubmitCredentials = async (formData) => {
	
	const onSubmitCredentials  = (formData) => {

const expertai_username = formData.expertai_username;
const expertai_password = formData.expertai_password;
const chatgpt_accesstoken = formData.chatgpt_accesstoken;

const creator_name = document.getElementById("creator_name").value;
const current_time = new Date().toLocaleString();

 setFormState(formData);
 const dx = {expertai_username: expertai_username, expertai_password: expertai_password, chatgpt_accesstoken: chatgpt_accesstoken, creator_name: creator_name, current_time: current_time};
//invoke('form-accesstoken',dx).then(setTokenx);

// post AI Credenttials Forge secret Stoarage starts
  setLoadingt(true);
  invoke('form-accesstoken',dx)
  .then((response) => {
     setTokenx(response);
     setLoadingt(false);
	 
	 if(response ==='Data-Submitted-Successfully'){
		alert('Data Subimitted Successfully. Page Refreshing in 5 seconds........ '); 
		// reload page in 5 seconds
		window.setTimeout(function() {
   location.reload();
}, 5000);


	 }
		 
  })
  .catch((error) => {
    console.error(error);
    setLoadingt(false);
  });
// post AI Credenttials Forge secret Stoarage ends
 };
	
	
	
	
	

// start chatgpt Chatting

	
	const onSubmitChat  = (formData) => {
$(document).ready(function(){
var chatgpt_accesstoken =  $(".key_chatgpt").val();
var emotion_img2 = 'sentiments_image/loader.gif';

var g_chat = $(".g_chat").val();
const g_chat2 = formData.g_chat2;

if(g_chat2 ==''){
 alert("ChatGPT Chat Message Cannot be empty");
return false;
}

if(chatgpt_accesstoken !=''){

var text_prompt=  g_chat2;

$('#loader_chatgpt_gchat').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;">  Please Wait! ChatGPT Procssing Data in Progress..</div>')

$.ajax({
    url: "https://api.openai.com/v1/completions",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', "Bearer " +chatgpt_accesstoken); 
      xhr.setRequestHeader('Content-Type', 'application/json'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': text_prompt,
'max_tokens': 500,
'n': 1
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
//console.log(msg);

$('#loader_chatgpt_gchat').hide();
//$('#result_chatgpt_gchat').html(msg);
var id = msg.id;
var model = msg.model;
//alert(model);

if(model != ''){
//$('#result_chatgpt_gchat').html("<div style='background:#3b5998;color:white;padding:6px;border:none' >ChatGPT Response Successful....</div><br>");
}else{
$('#result_chatgpt_gchat').html("<div style='background:green;color:white;padding:6px;border:none' >ChatGPT Data Chat Response Failed. Please Try Again....</div><br>");
//return false;
}

  var len = msg.choices.length;
var i = 1;

$("#result_chatgpt_gchat_append").html("<b style='font-size:16px'>ChatGPT Chat Result</b><br><br>");

$.each(msg.choices, function(k, v) {

var sentence_countxx  = i++;

var valuex = v.text;
var fixed = valuex.replace(/\;+/g, '<br>,');


  var res_chatgpt_gchat = "<div>" +
       "<div class='chatgpt_ai'> <b>Response: </b> " + valuex + "</div><br>" +              
                    "</div>";
$("#result_chatgpt_gchat_append2").append(res_chatgpt_gchat);


});


    },

    error: function(xhr, status, error){
		if(xhr.status ==401){
 alert("ChatGPT Access Token is Invalid or Incorrect: "  +error);
$('#loader_chatgpt_gchat').hide();
return false;
		}
		
			if(xhr.status ==429){
 alert("ChatGPT Error: Either You have Exceed your Quota or Rate limit reached for requests: "  +error);
$('#loader_chatgpt_gchat').hide();
return false;
		}


if(xhr.status ==0){
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_chatgpt_gchat').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
 //alert("Error Message: " +error);
 //alert("Error Status: " +status);
$('#loader_chatgpt_gchat').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}


    }
});


}// close if


});
}
// end chatgpt chatting
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	const onSubmitData  = (formData) => {
$(document).ready(function(){


var sentiments = $(".sentiments:checked").val();
var keyphrases = $(".keyphrases:checked").val();
var summarizex = $(".summarizex:checked").val();
var entity =     $(".entity:checked").val();
var translate =  $(".translate:checked").val();

var token_ex2 =     $(".token_ex2").val();
var expert_ai_accesstoken = token_ex2;
var chatgpt_accesstoken =  $(".key_chatgpt").val();

//c_pagecontent
//c_pageid

const cpage = formData.cpage;
var jira_data1 = cpage.replace(/[^A-Za-z0-9,. ]/g, '');


//var c_pagecontent =  $(".c_pagecontent").val();
//var jira_data = c_pagecontent.replace(/[^A-Za-z0-9,. ]/g, '');

if(translate =='yes'){
	const trans_language = formData.trans_language;
//alert('label:' +colorx.label);
const lang  =trans_language.value;
var translatex = lang;
//alert('yes');
if(translatex ==''){
alert('.You Selected Yes, so Translating Language Cannot be Empty');	
return false;	
}
}

if(translate =='no'){
	const trans_language = 0;
var translatex = trans_language;
//alert('no');
}

// Start Overall AI Process

var img_loader ='sentiments_image/loader.gif';

// start entinties analysis

if(entity == 'yes' && expert_ai_accesstoken !=''){
$('#loader_entities').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;"> Please Wait! Expert.AI Data Entities Analysis in Progress..</div>')

$.ajax({
    url: "https://nlapi.expert.ai/v2/analyze/standard/en/entities",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', "Bearer " +expert_ai_accesstoken); 
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'document': {
            'text': jira_data1
        }
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
//console.log(msg);

$('#loader_entities').hide();
//$('#result_entities').html(msg);
var content = msg.data.content;
var success = msg.success;
//alert(content);
//alert(success);


  var len = msg.data.entities.length;

if(success == true){
$('#result_entities').html("<div style='color:white;background:#3b5998;padding:6px;border:none' >Expert.AI Data Entities Analysis Successful....</div><br>");
}else{
$('#result_entities').html("<div style='background:red;color:white;padding:6px;border:none' >Expert.AI Data Entities Analysis Failed. Please Try Again....</div><br>");
//return false;
}



$.each(msg.data.entities, function(k, v) {
var value = v.lemma;
  var res_entities = "<span>" +
       "<span class='css_ai'> " + value + "</span>" +              
                    "</span>";
$("#result_entities_append").append(res_entities);


});

    },

    error: function(xhr, status, error){

if(xhr.status ==401){
 alert("Either Authorization Token has Expired or Invalid. Please Generate New Expert.AI Access Token. Go to Settings");
$('#loader_entities').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}


if(xhr.status ==413){
 alert("Request Entity Too Large than the plan the user subscribed");
$('#loader_entities').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}



if(xhr.status ==0){
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_entities').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
 //alert("Error Message: " +error);
 //alert("Error Status: " +status);
$('#loader_entities').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}


    }
});


} // close if


// end entities analysis






// start keyphrases



if(keyphrases == 'yes' && expert_ai_accesstoken !=''){
$('#loader_keyphrases').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;">  Please Wait! Expert.AI Data Keyphrases and Main Sentence Analysis in Progress..</div>')

$.ajax({
    url: "https://nlapi.expert.ai/v2/analyze/standard/en/relevants",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', "Bearer " +expert_ai_accesstoken); 
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'document': {
            'text': jira_data1
        }
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
//console.log(msg);

$('#loader_keyphrases').hide();
//$('#result_keyphrases').html(msg);
var content = msg.data.content;
var success = msg.success;
//alert(content);
//alert(success);




if(success == true){
$('#result_keyphrases').html("<div style='background:#3b5998;color:white;padding:6px;border:none' >Expert.AI Data Keywords, KeyPhrases and Main Sentence Analysis Successful....</div><br>");
}else{
$('#result_keyphrases').html("<div style='background:green;color:white;padding:6px;border:none' >Expert.AI Data KeyPhrases and Main Sentence Analysis Failed. Please Try Again....</div><br>");
//return false;
}





  var len = msg.data.mainSentences.length;

var i = 1;

$("#result_main_sentences_append").append("<b style='font-size:16px'> Data Text Main Sentences/Summary Analysis</b><br><br>");

$.each(msg.data.mainSentences, function(k, v) {

var sentence_count  = i++;

var valuex = v.value;
  var res_main_sentences = "<div>" +
       "<div class='css_ai'> <b>(" + sentence_count + ".)</b> " + valuex + "</div><br>" +              
                    "</div>";
$("#result_main_sentences_append").append(res_main_sentences);


});





$("#result_keyphrases_append").append("<br><b style='font-size:16px'> Data Text KeyPhrases Analysis</b><br><br>");
$.each(msg.data.mainPhrases, function(k, v) {
var valuex = v.value;
  var res_keyphrases = "<span>" +
       "<span class='css_ai'> " + valuex + "</span>" +              
                    "</span>";
$("#result_keyphrases_append").append(res_keyphrases);


});


$("#result_keywords_append").append("<br><b style='font-size:16px'> Data Text KeyWords Analysis</b><br><br>");
$.each(msg.data.mainLemmas, function(k, v) {
var valuex = v.value;
  var res_keywords = "<span>" +
       "<span class='css_ai'> " + valuex + "</span>" +              
                    "</span>";
$("#result_keywords_append").append(res_keywords);


});



    },

    error: function(xhr, status, error){

if(xhr.status ==401){
 alert("Either Authorization Token has Expired or Invalid. Please Generate New Expert.AI Access Token. Go to Settings");
$('#loader_keyphrases').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}


if(xhr.status ==413){
 alert("Request Entity Too Large than the plan the user subscribed");
$('#loader_keyphrases').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}



if(xhr.status ==0){
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_keyphrases').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
 //alert("Error Message: " +error);
 //alert("Error Status: " +status);
$('#loader_keyphrases').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}


    }
});


} // close if



// end keyphrases






// start sentiment analysis


if(sentiments == 'yes' && expert_ai_accesstoken !=''){
$('#loader_sentiment').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;">  Please Wait! Expert.AI Data Sentiments Analysis in Progress..</div>')

$.ajax({
    url: "https://nlapi.expert.ai/v2/analyze/standard/en/sentiment",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', "Bearer " +expert_ai_accesstoken); 
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'document': {
            'text': jira_data1
        }
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
//console.log(msg);

$('#loader_sentiment').hide();
//$('#result_sentiment').html(msg);
var content = msg.data.content;
var success = msg.success;
//alert(content);
//alert(success);

var overall = msg.data.sentiment.overall;
var negativity = msg.data.sentiment.negativity;
var positivity = msg.data.sentiment.positivity;



if(positivity == 0){

var img_emotion ='sentiments_image/sad.png';
}else{
var img_emotion ='sentiments_image/happy.png';
}



if(positivity == 0){
var sentiments ='Negative';

}else{
var sentiments ='Positive';
}


if(positivity == 0){
var confidence =negativity;
var confidence1 ='Sad';
var emotion_img = 'sentiments_image/sad.png';

}else{


var confidence =positivity;
var confidence1 ='Happy(Good)';
var emotion_img = 'sentiments_image/happy.png';

}


if(positivity == 0 && negativity ==0){
var sentiments ='Neutral';
var confidence =0;
var confidence1 ='Mild';
var emotion_img = 'sentiments_image/neutral.png';

}



$("#result_sentiment_append").append("<b style='font-size:16px'> Data Text Seniments Analysis</b><br><br>")

  var res_sentiment = "<div class='sentiment_css'>" +
    "<div > <b>Overall Sentiments Score: </b> " + overall + "</div>" + 
    "<div > <b>Positive Sentiments Score: </b> " + positivity + "</div>" + 
    "<div > <b>Negative Sentiments Score: </b> " + negativity + "</div>" + 
"<div> <b>Data Sentimental Tags: &nbsp;</b> (" + sentiments + ")&nbsp;&nbsp;&nbsp; <b style='color:#800000;font-size:16px;'>Confidence:</b>" + confidence + " %</div>" +  


"Data Sentimental Tags: &nbsp;<b> " + confidence1 + " &nbsp;&nbsp;&nbsp;</b> <img style='border-style: solid; border-width:3px; border-color:#ec5574; width:40px;height:40px; max-width:40px;max-height:40px;border-radius: 50%;' src=" + emotion_img +" /><br>" +
                     "</div>";
$("#result_sentiment_append").append(res_sentiment);





if(success == true){
$('#result_sentiment').html("<div style='background:#3b5998;color:white;padding:6px;border:none' >Expert.AI Data Sentiments Analysis Successful....</div><br>");
}else{
$('#result_sentiment').html("<div style='background:green;color:white;padding:6px;border:none' >Expert.AI Data Sentiment Analysis Failed. Please Try Again....</div><br>");
//return false;
}


    },

    error: function(xhr, status, error){

if(xhr.status ==401){
 alert("Either Authorization Token has Expired or Invalid. Please Generate New Expert.AI Access Token. Go to Settings");
$('#loader_sentiment').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}


if(xhr.status ==413){
 alert("Request Entity Too Large than the plan the user subscribed");
$('#loader_sentiment').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}



if(xhr.status ==0){
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_sentiment').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
 //alert("Error Message: " +error);
 //alert("Error Status: " +status);
$('#loader_sentiment').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}


    }
});


} // close if



// end sentiment analysis





// start chatgpt Translate analysis


if(translate == 'yes' && chatgpt_accesstoken !=''){
var text_prompt= `Translate "${jira_data1}" to "${translatex}" `;

$('#loader_chatgpt_translate').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;border:none;"> Please Wait! ChatGPT Data Translation in Progress..</div>')

$.ajax({
    url: "https://api.openai.com/v1/completions",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', "Bearer " +chatgpt_accesstoken); 
      xhr.setRequestHeader('Content-Type', 'application/json'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': text_prompt,
'max_tokens': 3000,
'n': 1
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
//console.log(msg);

$('#loader_chatgpt_translate').hide();
//$('#result_chatgpt_translate').html(msg);
var id = msg.id;
var model = msg.model;
//alert(model);

if(model != ''){
$('#result_chatgpt_translate').html("<div style='background:#3b5998;color:white;padding:6px;border:none' >ChatGPT Data Translation Successful....</div><br>");
}else{
$('#result_chatgpt_translate').html("<div style='background:green;color:white;padding:6px;border:none' >ChatGPT Data Translation Failed. Please Try Again....</div><br>");
//return false;
}

  var len = msg.choices.length;
var i = 1;

$("#result_chatgpt_translate_append").append("<b style='font-size:16px'>ChatGPT Data Text Translation Result</b><br><br>");

$.each(msg.choices, function(k, v) {

var sentence_countxx  = i++;

var valuex = v.text;
var fixed = valuex.replace(/\;+/g, '<br>,');


  var res_chatgpt_translate = "<div>" +
       "<div class='chatgpt_ai'> <b>(Translation Sample " + sentence_countxx + ".)</b> " + valuex + "</div><br>" +              
                    "</div>";
$("#result_chatgpt_translate_append").append(res_chatgpt_translate);


});


    },

    error: function(xhr, status, error){
		if(xhr.status ==401){
 alert("ChatGPT Access Token is Invalid or Incorrect: "  +error);
$('#loader_chatgpt_translate').hide();
return false;
		}
		
			if(xhr.status ==429){
 alert("ChatGPT Error: Either You have Exceed your Quota or Rate limit reached for requests: "  +error);
$('#loader_chatgpt_translate').hide();
return false;
		}


if(xhr.status ==0){
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_chatgpt_translate').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
 //alert("Error Message: " +error);
 //alert("Error Status: " +status);
$('#loader_chatgpt_translate').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}


    }
});


}// close if
// end chatgpt Translate analysis








// start chatgpt summarizex analysis


if(summarizex == 'yes' && chatgpt_accesstoken !=''){

var text_prompt= `Summarize "${jira_data1}" in 5 sentences. `;

$('#loader_chatgpt_summarizex').fadeIn(400).html('<br><div style="color:black;background:#ddd;padding:10px;">  Please Wait! ChatGPT Data Translation in Progress..</div>')

$.ajax({
    url: "https://api.openai.com/v1/completions",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization', "Bearer " +chatgpt_accesstoken); 
      xhr.setRequestHeader('Content-Type', 'application/json'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': text_prompt,
'max_tokens': 1000,
'n': 1
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
//console.log(msg);

$('#loader_chatgpt_summarizex').hide();
//$('#result_chatgpt_summarizex').html(msg);
var id = msg.id;
var model = msg.model;
//alert(model);

if(model != ''){
$('#result_chatgpt_summarizex').html("<div style='background:#3b5998;color:white;padding:6px;border:none' >ChatGPT Data Summarization Successful....</div><br>");
}else{
$('#result_chatgpt_summarizex').html("<div style='background:red;color:white;padding:6px;border:none' >ChatGPT Data Summarization Failed. Please Try Again....</div><br>");
//return false;
}

  var len = msg.choices.length;
var i = 1;

$("#result_chatgpt_summarizex_append").append("<b style='font-size:16px'>ChatGPT Data Text Summarization Result</b><br><br>");

$.each(msg.choices, function(k, v) {

var sentence_countxx  = i++;

var valuex = v.text;
var fixed = valuex.replace(/\;+/g, '<br>,');


  var res_chatgpt_summarizex = "<div>" +
       "<div class='chatgpt_ai'> <b>Summary: </b> " + valuex + "</div><br>" +              
                    "</div>";
$("#result_chatgpt_summarizex_append").append(res_chatgpt_summarizex);


});


    },

    error: function(xhr, status, error){
		if(xhr.status ==401){
 alert("ChatGPT Access Token is Invalid or Incorrect: "  +error);
$('#loader_chatgpt_summarizex').hide();
return false;
		}
		
			if(xhr.status ==429){
 alert("ChatGPT Error: Either You have Exceed your Quota or Rate limit reached for requests: "  +error);
$('#loader_chatgpt_summarizex').hide();
return false;
		}


if(xhr.status ==0){
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_chatgpt_summarizex').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
 //alert("Error Message: " +error);
 //alert("Error Status: " +status);
$('#loader_chatgpt_summarizex').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}


    }
});


}// close if
// end chatgpt summarizex analysis







// End Overall AI Process

});

};
















// Generate Expert.AI Access Token if User has submitted ExpertAI Username and password starts
	const onSubmitToken  = (formData) => {
$(document).ready(function(){

const tokk = formData.tokk;
//start Expert. ai accesstoken generation
var ex_usernamexx =     $(".ex_username").val();
var expertai_passwordxx =  $(".ex_pass").val();

// start if
if(ex_usernamexx ===''){
	alert('Expert.AI Username Cannot be Empty');
} 
else if(ex_usernamexx ===''){
	alert('Expert.AI Password Cannot be Empty');
}else{
	
$('#loader_token').fadeIn(400).html('<br><div style="width:80%;color:black;background:#ddd;padding:10px;"> Please Wait! .Generating Expert.AI Access Token......</div><br>');

$.ajax({
    url: "https://developer.expert.ai/oauth2/token",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); 
    },
    type: 'POST',
    crossDomain: true,
    dataType: 'html',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
        'username': ex_usernamexx,
        'password': expertai_passwordxx
    }),
    cache:false,
    success:function(msg){
     // alert(JSON.stringify(msg));
$('#loader_token').hide();
//$('#result_token').html(msg);

$('.p_msg').html(msg);
$('.p_msg_value').val(msg).value;
var token_ex = msg;
if(msg != ''){
$('#result_token').html("<div style='background:#ddd;color:#ccc;padding:6px;border:none' >Expert.AI Access Token Successfully Generated....</div><br>");


// post Expert AI Access Token to Forge secret Stoarage starts
const dx2 = {token_ex: token_ex};

  setLoadingt2(true);
  invoke('form-accesstoken2',dx2)
  .then((response) => {
     setTokenx2(response);
     setLoadingt2(false);
	 
	 if(response ==='Access-Token-Generated-Successfully'){
		alert('Data Subimitted Successfully. Page Refreshing in 5 seconds........ '); 
		// reload page in 5 seconds
		window.setTimeout(function() {
   location.reload();
}, 5000);


	 }
		 
  })
  .catch((error) => {
    console.error(error);
    setLoadingt2(false);
  });
// post Expert AI Access Token to Forge secret Stoarage ends



}else{
$('#result_token').html("<div style='background:red;color:white;padding:6px;border:none' >Expert.AI Access Token Geneartion Failed. Please Try Again....</div><br>");
//return false;
}
    },
    error: function(xhr, status, error){
		
		
if(xhr.status ==401){
 alert("Invalid credentials. Either Expert.AI Username and Password Entered in Settings Step 1 above is wrong");
$('#loader_token').hide();

$('.page_reload').html("<Button id='reload_btn'  class='reload_btn'>Reload Page</Button><br>");

return false;
}


if(xhr.status ==413){
 alert("Request Entity Too Large than the plan the user subscribed");
$('#loader_token').hide();

$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

return false;
}


if(xhr.status ==0){
	 alert(xhr.status);
 alert("Cannot get data. Ensure there is Internet Connection....");
$('#loader_token').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");
}else{
 alert("Error XHR Code: " +xhr.status + ", Error Message: " +error);
$('#loader_token').hide();
$('.page_reload').html("<button id='reload_btn'  class='reload_btn'>Reload Page</button><br>");

}
 }
})

}//if ends 
// end Expert.AI Accesstoken generation
});

};
// Generate Expert.AI Access Token if User has submitted ExpertAI Username and password end





  useEffect(() => {
    //invoke('get-pageid', { example: 'my-invoke-variable' }).then(setData);
//invoke('getpagecontent-methodx').then(setPagecontent);
//invoke('getaccesstokenresult-methodx').then(setAccesstokenresult);


// get  jira Page Id starts
  setLoading2(true);
  invoke('get-pageid')
  .then((response) => {
     setData(response);
     setLoading2(false);
  })
  .catch((error) => {
    console.error(error);
    setLoading2(false);
  });
// get  jira Page Id Ends




// get  jira Page Content starts
  setLoading3(true);
  invoke('getpagecontent-methodx')
  .then((response) => {
     setPagecontent(response);
     setLoading3(false);
  })
  .catch((error) => {
    console.error(error);
    setLoading3(false);
  });
// get  jira Page Content Ends



// get  AI Access Token starts
  setLoading4(true);
  invoke('getaccesstokenresult-methodx')
  .then((response) => {
     setAccesstokenresult(response);
     setLoading4(false);
  })
  .catch((error) => {
    console.error(error);
    setLoading4(false);
  });
// get  AI Access Token Ends



// get  AI Access Token starts
  setLoading5(true);
  invoke('getaccesstokenresult-methodx2')
  .then((response) => {
     setAccesstokenresult2(response);
     setLoading5(false);
  })
  .catch((error) => {
    console.error(error);
    setLoading5(false);
  });
// get  AI Access Token Ends



fetchAccountId().then((publicName) => setPubname(publicName));

// Hide and unhide Translating language select box
$(document).ready(function(){
$('.trans_hide_show').hide();
});	


$(document).ready(function(){
$('.trans_hide_btn').click(function(){
	$('.trans_hide_show').hide();
		})
});

$(document).ready(function(){
$('.trans_show_btn').click(function(){
	$('.trans_hide_show').show();
		})
});


$(document).ready(function(){
$('#xrefresh_btn').click(function(){
alert('Page Refreshed');
location.reload();		
	})					
});

$(document).ready(function(){
//$('.reload_btn').click(function(){
$(document).on( 'click', '.reload_btn', function(){ 
alert('Page Refreshed Successfully');
location.reload();
});
});




  }, []);


  return (
<div>


<b>Welcome ...</b> {pubname}  <br />
<Button id="xrefresh_btn">
             Refresh Page
            </Button>


<br />

<center><h4>Jira Issues AI Analyzer</h4>
		Powered By <b>Expert.AI & ChatGPT AI</b>
		</center><br />


<div>





<Tabs
      onChange={(index) => console.log('Selected Tab', index + 1)}
      id="default"
    >
      <TabList>
        <Tab>AI Analysis</Tab>
        <Tab>ASK ChatGPT</Tab>
        <Tab>App Settings</Tab>
      </TabList>



      <TabPanel>
        <Panel>
		

{loading2 && <span>  <img alt='' src={LoaderImage} /> Please Wait Getting jira Page Id  ...</span>}

{loading3 && <span>  <img alt='' src={LoaderImage} /> Please Wait Getting jira Page Content  ...</span>}

<b>Jira Issue Page Key:</b>  {data} <br />



 <Form onSubmit={onSubmitData}>
      {({ formProps }: any) => (
        <form {...formProps}>


		  <Box>
		  <label style={{ color: '#3b5998'}}>
			<b>Jira Issues  Sentiments Analysis(By Expert.AI)</b></label><br />
Easily analyze Jira Issues  for Sentiments <b>Positivity, negativity or neutrality</b> statements.<br />
      <Radio
	   className="sentiments"
	   id="sentiments"
        value="yes"
        label="Yes"
        name="sentiments"
		isChecked={true}
		 checked
      />
      <Radio
	    className="sentiments"
	    id="sentiments"
        value="no"
        label="No"
        name="sentiments"
		isChecked={true}
      />
    </Box>
	
	<br />
	
	
	  
	    <Box>
		  <label style={{ color: '#3b5998'}}>
			<b>Jira Issues Main Sentence and Keyphrases Analysis(By Expert.AI)</b></label><br />
Easily get the<b>Main Sentence of the Jira Issues</b> & ultimately discover all the <b>keywords and keyphrases</b>
 in the jira Page Content to help <b>save time and energy</b><br />

      <Radio
	   className="keyphrases"
	   id="keyphrases"
        value="yes"
        label="Yes"
        name="keyphrases"
		isChecked={true}
      />
      <Radio
	    className="keyphrases"
	    id="keyphrases"
        value="no"
        label="No"
        name="keyphrases"
		isChecked={true}
      />
    </Box>
	<br />
	
	
	
	    <Box>
		  <label style={{ color: '#3b5998'}}>
			<b>Jira Issues Content Entity Analysis(By Expert.AI)</b></label><br />
Easily analyze Jira Issues Content to list all the <b>People, Persons, Organisations, Companies, Locations and all the entities</b> seen on the Page Content<br />

      <Radio
	   className="entity"
	   id="entity"
        value="yes"
        label="Yes"
        name="entity"
		isChecked={true}
      />
      <Radio
	    className="entity"
	    id="entity"
        value="no"
        label="No"
        name="entity"
		isChecked={true}
      />
    </Box>
	<br />
	
	
	
	
	    <Box>
		  <label style={{ color: '#3b5998'}}>
			<b>Jira Issues Content Summarization(By ChatGPT AI)</b></label><br />
Easily Summarize Jira Issues Content to save you reading <b>Time & Energy</b><br />

      <Radio
	   className="summarizex"
	   id="summarizex"
        value="yes"
        label="Yes"
        name="summarizex"
		isChecked={true}
      />
      <Radio
	    className="summarizex"
	    id="summarizex"
        value="no"
        label="No"
        name="summarizex"
		isChecked={true}
      />
    </Box>
	<br />
	
	
	
	  <Box>
		  <label style={{ color: '#3b5998'}}>
			<b>Jira Issues Content Language Translation (By ChatGPT AI)</b></label><br />
Easily translate Jira Issues from one language to another to help <b>break language barrier</b><br />
<span><b style={{ color: 'red'}}>Select Yes to View Traslating Languages</b></span>
<br />
<Radio
	   className="translate trans_show_btn"
	   id="translate"
        value="yes"
        label="Yes"
        name="translate"
		isChecked={true}
      />
      <Radio
	    className="translate trans_hide_btn"
	    id="translate"
        value="no"
        label="No"
        name="translate"
		isChecked={true}
      /><br />
</Box>
	
	



<div className='trans_language  trans_hide_show'>
		
	<Field name="trans_language"  id="tra">
   {({ fieldProps: { id, ...rest }, error }) => (
     <Select
      name="trans_language"
      id="trans_language"
      inputId="single-select-example"
      className="single-select"
      classNamePrefix="react-select"
      options={[
        { label: 'Spanish', value: 'Spanish' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'French', value: 'French' },
        { label: 'Portuguese', value: 'Portuguese' },
        { label: 'Bengali', value: 'Bengali' },
        { label: 'Russian', value: 'Russian' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'German', value: 'German' },
        { label: 'Korean', value: 'Korean' },
        { label: 'Indonesian', value: 'Indonesian' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Viatnameese', value: 'Viatnameese' },
        { label: 'Urdu', value: 'Urdu' },
        { label: 'Telugu', value: 'Telugu' },
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Turkish', value: 'Turkish' },
        { label: 'English', value: 'English' },
        { label: 'Latin', value: 'Latin' },
      ]}
      placeholder="Choose Translating Language"
      {...rest}
    />
)}
</Field>

</div>

 <div>   
<input type="hidden" name="c_pageid" className="c_pageid" value={data} />
<input type="hidden" name="c_pagecontent" className="c_pagecontent" value={pagecontent} />


{JSON.stringify(accesstokenresult) !=='{}'   &&  <div>
 <input type='hidden' className="ex_username" value={accesstokenresult.expertai_username} />
 <input type='hidden' className="ex_pass" value={accesstokenresult.expertai_password} />
 <input type='hidden' className="key_chatgpt" value={accesstokenresult.chatgpt_accesstoken} />

 </div> }
 
 
 {JSON.stringify(accesstokenresult2) !=='{}'   &&  <div>
 <input type='hidden' className="token_ex2" value={accesstokenresult2.token_ex} />

 </div> }
 

</div>

 <Field label="Fetched jira Issues Content" name="cpage" isRequired defaultValue={pagecontent}>
            {({ fieldProps }: any) => (
              <Fragment>
                <TextArea
                  placeholder=""
                  {...fieldProps}
                />
                <HelperMessage>
                 
                </HelperMessage>
              </Fragment>
            )}
          </Field>
		  
		  
<div id='loader_entities'></div>
<div id='result_entities'></div>
<div id='result_entities_append'></div>


<div id='loader_keyphrases'></div>
<div id='result_keyphrases'></div>


<div id='result_main_sentences_append'></div>
<div id='result_keyphrases_append'></div>
<div id='result_keywords_append'></div>


<div id='loader_sentiment'></div>
<div id='result_sentiment'></div>
<div id='result_sentiment_append'></div>



<div id='loader_chatgpt_summarizex'></div>
<div id='result_chatgpt_summarizex'></div>

<div id='result_chatgpt_summarizex_append'></div>




<div id='loader_chatgpt_translate'></div>
<div id='result_chatgpt_translate'></div>

<div id='result_chatgpt_translate_append'></div>

 

          <FormFooter>
            <Button type="submit" appearance="primary">
             Analyze Now
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>



		
</Panel>
      </TabPanel>


	  
	  
	  <TabPanel>
        <Panel>
		<h5>ASK ChatGPT</h5>
		Easily Chat with ChatGPT. Ask him any question about anything in the world especially about anything you do not understand
		about Jira Issues Content for further explanation .<br /> Eg
		
		<b>What is Atlassian Jira Issues</b>
		
		
		
		

<br />
<Form onSubmit={onSubmitChat}>
      {({ formProps }: any) => (
        <form {...formProps}>


       <Field label="Enter Chat Message" name="g_chat2" className ="g_chat" isRequired defaultValue="">
            {({ fieldProps }: any) => (
              <Fragment>
                <TextArea
                  placeholder="Enter Chat Message"
                  {...fieldProps}
                />
                <HelperMessage>
                </HelperMessage>
              </Fragment>
            )}
          </Field>
		  
	
<div id='loader_chatgpt_gchat'></div>
<div id='result_chatgpt_gchat'></div>

<div id='result_chatgpt_gchat_append'></div>
<div id='result_chatgpt_gchat_append2'></div>

		  
          <FormFooter>
            <Button type="submit" appearance="primary">
       Chat Now
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>





		
		
		</Panel>
      </TabPanel>


	  
	  
	  

      <TabPanel>
        <Panel>

<h5>Set Expert.AI and ChatGPT AI Credentials/Access Token</h5>
<b>https://www.expert.ai</b><br />
<b>https://platform.openai.com</b><br />

 <div>
     
	 
{loading4 && <span>  <img alt='' src={LoaderImage} /> Please Wait Loading Expert.AI and ChatGPT AI Credentials from Forge Storage  ...</span>}

	  

	  
	  {JSON.stringify(accesstokenresult) === '{}' && 

<InlineMessage
      appearance="error"
      iconLabel=""
      secondaryText=" Expert.AI and Chatgpt AI has not been Added Yet.. Please Add it First.."
    >
    </InlineMessage>}
	

 
{JSON.stringify(accesstokenresult) !=='{}'   &&  <span> Access Token Updated by  <b>{accesstokenresult.creator_name}</b>
 on <b> {accesstokenresult.current_time}</b></span> }


   

</div>

<h5>Step1.)</h5>

This credentials are save in Forge Storage API Via <b>Forge storage.setSecret()</b> <br />
	  
 <Form onSubmit={onSubmitCredentials}>
      {({ formProps }: any) => (
        <form {...formProps}>


       
		     <Field label="Enter Expert.AI Username/Email" name="expertai_username" isRequired defaultValue="">
            {({ fieldProps }: any) => (
              <Fragment>
                <Textfield
                  placeholder="Enter Expert.AI Username"
                  {...fieldProps}
                />
                <HelperMessage>
                 (Get it from https://www.expert.ai)
                </HelperMessage>
              </Fragment>
            )}
          </Field>
		  
		  
		     <Field label="Enter Expert.AI Password" name="expertai_password" isRequired defaultValue="">
            {({ fieldProps }: any) => (
              <Fragment>
                <Textfield
                  placeholder="Enter Expert.AI Password"
                  {...fieldProps}
                />
                <HelperMessage>
               (Get it from https://www.expert.ai)
                </HelperMessage>
              </Fragment>
            )}
          </Field>

	     <Field label="Enter ChatGPT Access Token" name="chatgpt_accesstoken" isRequired defaultValue="">
            {({ fieldProps }: any) => (
              <Fragment>
                <Textfield
                  placeholder="Enter ChatGPT Access Token"
                  {...fieldProps}
                />
                <HelperMessage>
                  (Get it from https://platform.openai.com/docs/guides/gpt)
                </HelperMessage>
              </Fragment>
            )}
          </Field>


<input type="hidden" id="creator_name" name="creator_name" value={pubname} />




{loadingt && <span>  <img alt='' src={LoaderImage} /> Submitting Expert.AI and ChatGPT AI Credentials to Atlassian Forge Secret Storage  ...</span>}

{tokenx && 

<InlineMessage
      appearance="confirmation"
      iconLabel=""
      secondaryText={tokenx}
    >
      <p>{tokenx}</p>
    </InlineMessage>}


		  
          <FormFooter>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
	
	
      {formState && <div>{JSON.stringify(formState)}</div>}<br />
	  
	  
	  <h5>Step2.)</h5>
	  Generate Expert.AI Access Token based on the submitted Username and Password above and save it in 
	  Forge Storage API Via <b>Forge storage.setSecret()</b>
	  <br />
	  
	   <Form onSubmit={onSubmitToken}>
      {({ formProps }: any) => (
        <form {...formProps}>


       
		     <Field label="Generate Token" name="tokk" defaultValue="Expert.AI Token">
            {({ fieldProps }: any) => (
              <Fragment>
                <Textfield
                  placeholder="Generate Token"
                  {...fieldProps}
                />
                <HelperMessage>
                
                </HelperMessage>
              </Fragment>
            )}
          </Field>
		  
		 
	  
	   <div id='loader_token'></div>
       <div id='result_token'></div>

		  
          <FormFooter>
            <Button type="submit" appearance="warning">
             Generate Expert.AI Access Token
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
	  
	   <br />
	  <br />

</Panel>
      </TabPanel>



      
    </Tabs>
</div>



</div>
  );
}

export default App;
