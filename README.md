# Optimistic UI demo
An demo of an optimistic ui based on vue3 and vue-query

## Set up the environment

    yarn 
    yarn run build

## Run the demo

    yarn run dev

Then click on the localhost link in the output of that command to open the website. Go to one of the three pages listed below. 

## How to use the demo

There are three pages ni this demo.

1. /pessimistic1
2. /pessimistic2
3. /optimistic

You can change the server latency by changing the value of ```delayTime``` in the file ```/src/mocks/browser.ts```. 

When using a value of 0 for this variable you'll see there is no difference in UX between the three pages. When you use a higher value for this variable (eg 2000) then you'll see the difference in UX of the two pessimistic pages and the optimistic page.
