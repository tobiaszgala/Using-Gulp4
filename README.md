# Using Gulp 4

## Description

A simple example of using gulp 4 to handle serial and parallel tasks such as compiling sass files, minifying CSS and JS files as well as optimizing images using popular npm packages. To handle live reload and live preview I used browserSync npm module. 

## Usage

Please install gulp version 4 globally.

## Options

```gulp``` - Concat scripts, compile sass, optimize images, minify css and js files, open live server with live reload when any change in sass files is made

```gulp build``` - Handle everything above except live server

```gulp scripts``` - Concat and minify script files

```gulp styles``` - Compile sass files and minify

```gulp images``` - Optimize images size

```gulp clean``` - Handle cleaning
