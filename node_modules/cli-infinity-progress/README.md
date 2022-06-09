## A infinity progress bar for terminal

![cli-infinity-progress](https://user-images.githubusercontent.com/1549069/112765222-6a7f9a00-9021-11eb-811a-76abcaee1139.gif)

## Also customizable

You can add header, footer and change every time
![cli-infinity-progress-3](https://user-images.githubusercontent.com/1549069/112822071-b15ea580-909c-11eb-8b7e-cd4e2a2fbbeb.gif)

## Install

```bash
npm install cli-infinity-progress
```

## Usage

```js
const CLIInfinityProgress = require('cli-infinity-progress');

const progress = new CLIInfinityProgress();
progress.start();
```

## Methods:

| Name                              | Return | Desc                                                                           |
| --------------------------------- | ------ | ------------------------------------------------------------------------------ |
| .setBarColor(colors.green)        | this   | Set bar color `const colors = require('cli-infinity-progress/colors');`        |
| .setBackgroundColor(colors.white) | this   | Set background color `const colors = require('cli-infinity-progress/colors');` |
| .setHeader('Header')              | this   | Set header on top of progress. you can update every time                       |
| .setFooter('Footer')              | this   | Set footer on bottom of progress. you can update every time                    |
| .setBarChar('🚕')                 | this   | Set bar char                                                                   |
| .setBackgroundChar('-')           | this   | Set background char                                                            |
| .setDirectionRightToLeft()        | this   | Progress start from right default is left                                      |
| .setDirectionLeftToRight()        | this   | Progress start from left                                                       |
| .setSize(30)                      | this   | Set progress size default is 60                                                |
| .setBarSize(5)                    | this   | Set bar size default is 20                                                     |
| .setRefreshRate(80)               | this   | Set refresh rate default is (1000 / 25)ms                                      |
| .start()                          | this   | Start progress                                                                 |
| .remove()                         | this   | Remove progress from terminal                                                  |
| .stop()                           | this   | Stop progress on terminal                                                      |
| .pause()                          | this   | Pause progress on terminal                                                     |
| .resume()                         | this   | Resume progress on terminal                                                    |

<br />

## You can call all methods as chaining ex:

```js
const CLIInfinityProgress = require('cli-infinity-progress');
const colors = require('cli-infinity-progress/colors');

progress
  .setBackgroundColor(colors.yellow)
  .setHeader('Loading ...')
  .setFooter('\nPlease be patient.')
  .setBarChar('🚕')
  .setBackgroundChar('_')
  .setDirectionRightToLeft()
  .setSize(32)
  .setBarSize(1)
  .setRefreshRate(100)
  .start();

setTimeout(() => progress.setFooter('\nWoo, Cab is coming.'), 3000);
```

Result:

![cli-infinity-progress-5](https://user-images.githubusercontent.com/1549069/112892939-3b375e80-90ef-11eb-8d42-1a02e65dbd6d.gif)

<br /><br />

[Roadmap](https://github.com/behnammodi/cli-infinity-progress/projects/1)
