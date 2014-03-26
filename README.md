grunt-bbb-server and grunt-bbb-styles use LESS 1.3
To use newer LESS features (as path variables), override installed LESS with newer one

CHUI is not included through bower because 1. it has to be compiled separately, and 2. for styling the UI (changing colors) it's best to override styles.less files in chocolatechip-ui/src/themes . Other than that file everything else should be left intact so that upgrading later would be possible.

Next steps:

1. prototype UI and assumed interactions
2. add actual application logic
