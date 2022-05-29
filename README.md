# ReactDisplayPairedNames
 
### To view the website
https://meat2stick.github.io/ReactDisplayPairedNames/

### To see the code (main branch)
https://github.com/meat2stick/ReactDisplayPairedNames

This code could be seperate into 3 parts.<br />

### Data initialisation
getApiData() will be called during the initialisation of the component which will result in data fetching from data.json. <br />
Upon successful fetching of the data, data will be stored in ApiData state and dataIsLoaded will be set to true. <br />
When dataIsLoaded is set to true, pairedNamesWithTwoOrMoreTags() will be called. <br />

### Data filtering
In this particular test, I need to find pairs of recipients from data.json and pair them up according to the tags that they have.<br />
First thing that came to my mind was to use bruteforce method. <br />
I wanted to loop recipients(A) against receipients(B) but I figured it would be a waste of resources because this type of looping will result in
duplicate of data.<br />
E.g. [A, B, C, D] Let's say A & C are pairs. we will get [A, C] and [C, A] pairs because A will loop through the entire array and so will C.<br />
So, I figured why not just start the loop checking at the index+1 of the array we are checking.<br />
E.g. <br />
 *
[A, B, C, D] <br />
Right now we need to check A against all the other elements in the array. Instead of start at index (A) again we are going to skip one element.<br />
So we start by checking B. No need to check A anyways because A will be a match and is not the correct result.<br />
<br />
Another example would be <br />
            * <br />
E.g. [A, B, C, D] <br />
Right now we finished checking A, we shall check B against all the elements but we will not start from A all over again because A has already checked B for us.  <br />
If A and B are a match, we will get [A,B]. So, we start checking from C<br />
So, there is no point for us to check B against A all over again because if we do that we will get
[A,B] and [B,A] which were both essentially the same thing in this case.  <br />
Therefore, we do not need to recheck from the beginning.
At the last element, this element will not be looped or checked with others because it is the last element. It already has been checked by other elements in the array.
<br />

### Displaying Data.
Nothing much has been done for this part except for orderedlist being looped over the pairedNames state.




