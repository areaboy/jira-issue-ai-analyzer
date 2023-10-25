# Jira Issues AI Analyzer

An AI Tools that help Businesses, Companies etc. to Analyze, Translate, and Summarize Jira Issues powered by Expert.AI , ChatGPT AI, Forge Storage API. Forge Custom UI, Atlaskit Design and much more 


## Quick start
This application was built using **Forge Custom UI**

This app was built based on this tutorial link https://developer.atlassian.com/platform/forge/build-a-custom-ui-app-in-jira/

Once You downloaded the app.  At root directory, open **manifest.yml** files  and remove this script line of code below. You do not need it. 

```
scripts:
        - https://code.jquery.com
        - https://cdnjs.cloudflare.com`
```
        Once you are done, Save the manifest.

        
- its time Build your app.  Now navigate to `static/hello-world` directory
 First run 
**npm install** to install all application dependency files

  then run

  **npm run build**   to build your app




- Deploy your app by running the code from the root directory of your application:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

  ### Additional  info.
  Here is list of packages I installed at `static/hello-world` directory:  for application design.You don't need to install them.
  The application will install it for you automatically when you run **npm install** command above.  I just listed it here for reference purposes.
  
npm i @atlaskit/form  

npm i @atlaskit/textarea 

npm i @atlaskit/textfield  

npm i @atlaskit/button  

npm i @atlaskit/inline-message 

npm i form-data  

npm i @atlaskit/tabs  

npm i @atlaskit/select

npm i @atlaskit/radio

npm install jquery --save

## Support

See [Get https://fredjarsoft.com/contact.html) for how to get help and provide feedback.
