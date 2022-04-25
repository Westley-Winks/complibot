# Complibot

Complibot has a quick wit. When called upon, she can `/insult` or `/compliment` a specific user. Within seconds, she thinks of a response (selects a line out of `.txt` files at random) and spits it at whoever the initiator wants.

## Database
Complibot only needed to read (scrape) a few articles to learn her responses. Specifically, I used Python to scrape [this site](https://thinkkindness.org/all-things-kindness/a-list-of-100-compliments/) for her compliments and [this one](https://ponly.com/funny-insults/) for the insults. The notebook is in `scraping.ipynb` if you want to see that.

## Code
Most of it came from [Discord's Getting Started page](https://discord.com/developers/docs/getting-started). I took what I needed and pieced the rest of it together.

## Deployment
Complibot lives on Google Cloud Platform's Cloud Run. It is a serverless platform that connects nicely with Secret Manager to hold tokens and such. It also integrates seamlessly with Cloud Build. Cloud Build can be configured to trigger a build whenever there is a push to `main` on a GitHub repo. That is exactly what I did to make my life that much easier and to be able to make changes on the fly. Push to `main` and I know that those changes will be reflected in the Discord channel within minutes.

## Contributing
This is my first real Javascript project so there are probably much smarter ways to do this or more proper styling that can be done. Complibot also only has 100 or so responses for each category. If you have some juicy responses, add them as new lines in `insults.txt` or `compliments.txt`!