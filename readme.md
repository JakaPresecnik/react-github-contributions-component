# :date: React Github Contributions Component :date:
![NPM version](https://img.shields.io/npm/v/react-github-contributions-component)
![Dependency version](https://img.shields.io/github/package-json/dependency-version/jakapresecnik/react-github-contributions-component/graphql-react)
![NPM Downloads](https://img.shields.io/npm/dw/react-github-contributions-component)

My first npm project. I noticed there aren't any builds like this so I decided I'll create one myself. This component builds up a calendar from the commits you made to github.
![Component's screenshot](/image/ghcc-screenshot.jpg)

## Requirement
* First you need to get your Github Access Token. If you don't know how to do that here is how: 
    * log in to your github account, and go into `settings` tab
    * go to`Developer settings`, and then `Personal access tokens`
    * click on `Generate new token` and check only the following:
        ![Generating token](/image/generate-token.jpg)
    * Generate token and copy the given token
* Create `.env` file at the root of your project folder (make sure you have .env included in .gitignore), and paste the given personal access token:
```
REACT_APP_GITHUB_ACCESS_TOKEN="your access token goes here"
```
This is needed to get access to github's api. You might encounter issues like your app will be getting a 401 error. In this case you need to reset the token in your github profile and change it in your .env file accordingly.

## Install
Start by installing react-github-contributions-component
```
npm install react-github-contributions-component
```

## Usage
Import it...
``` 
import {GithubContribution} from 'react-github-contributions-component'
```

...and use it in one of your components.
```
<GithubContribution userName="<yourusername>" theme="<option>" />
```
```
import {GithubContribution} from 'react-github-contributions-component';

function App() {
  return (
    <div className="App">
        <GithubContribution userName="jakapresecnik" theme="dark" />
    </div>
  );
}
```
## Options
### Themes
![Theme examples](/image/themes.jpg)
Select one of these options for different theme:
`"light", "dark", "purpleDark", "jokerLight", "jokerDark"
### Direction
 If you want it to have a different direction use attribute `vertical` in component. You don't need to pass any value in as it tests if it is true or false.


## Future versions
Like I said I just started building it, and it is still a bit rough, so expect to get updated. But for the future as a whole, this project will probably become depreciated, as I am from Slovenia and there are no Front end developer roles here, as well as having a class system that doesn't allow me to have a decant job only some shitty jobs where you die as soon as your shift is over .
    
