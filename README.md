Canvas / Discord group number (please check this carefully)
11 am Group 11

names of the team members
Sabeer Shahzad, Dinesh Balakrishnan, Jay Park, Presley Heikkila, Scarlett Shires

name of the project (alphanumeric, no spaces, max 32 chars, this will also be your URL)
CS-373 Website

URL of the GitLab repo
https://gitlab.com/dinesh.k.balakrishnan/cs373-website

the proposed project
Website designated for low income residents of Austin. The website will feature job listings, child care, and housing variable to user location

URLs of at least three disparate data sources that you will programmatically scrape using a RESTful API (be very sure about this)
https://data.austintexas.gov/Housing-and-Real-Estate/City-of-Austin-Affordable-Housing-Inventory/x5p7-qyuv
https://data.texas.gov/Social-Services/HHSC-CCL-Daycare-and-Residential-Operations-Data/bc5r-88dy
Jobs2Career from https://github.com/public-apis/public-apis#events

https://open-platform.theguardian.com/documentation/search

https://developer.nytimes.com/apis

https://rapidapi.com/veilleio-veilleio-default/api/companies-datas/

at least three models
each model must have many attributes
describe at least five of those attributes for each model that you could filter by or sort by on the model (table) pages
describe at least five additional attributes for each model that you could search for on the instance pages
describe at least two types of media for each model that you could display on the instance pages

1. Housing

   - Media:
     - Image of the house
     - News articles about nearby location
     - Data about the house
     - Google Maps pin of the location
   - Attributes:
     - Filter:
       - Number of Units
       - Tenure
       - Zip Code
       - Unit Type
       - Ground Lease
     - Search:
       - Address
       - Property Manager Company
       - Property Manager Company name
       - Status (where in the building process)
       - Calculated Fee in Lieu
     - Address
     - Number of units
     - Affordability Period
     - Property Manager phone number and email
     - Full list of attributes here: https://data.austintexas.gov/Housing-and-Real-Estate/City-of-Austin-Affordable-Housing-Inventory/x5p7-qyuv#:~:text=Columns%20in%20this%20Dataset
   - Number of Instances:
     - 1000+

2. Child Care

   - Media:
     - Image of the facility
     - News articles about nearby location
     - Data about the service
     - Google Maps pin of the location
   - Attributes:
     - Filter:
       - Days of Operation
       - Hours of Operation
       - Location Address
       - Programs provided at the Operation
       - County of the Facility / Operation
       - Subsidized Facility / Operation
     - Search:
       - Website Address
       - Mailing Address
       - Administrator / Director for the Operation
       - Phone Number
       - Email Address
     - Full list of attributes here: https://data.texas.gov/Social-Services/HHSC-CCL-Daycare-and-Residential-Operations-Data/bc5r-88dy#:~:text=Columns%20in%20this%20Dataset
   - Number of Instances:
     - 500+

3. Job Listings
   - Media:
     - Image of the facility
     - Data about the job
     - Google Maps pin of the location
   - Attributes:
     - Filter:
       - Zip
       - Industry
       - Mobile optimized job
       - Job type (full time, part time, etc)
       - Salary
       - Company's revenue
       - Company size
     - Search:
       - Date
       - Job Description
       - Job type
       - Company's social networks
       - Company's monthly visitors
   - Number of Instances:
     - 200

each model must connect to at least two other models
The three models (Housing, Child Care, Job Listings) are all interconnected through location.

what three questions will you answer due to doing this data synthesis on your site? 1. Where can a family with young children affordably live in Austin?

    2. What jobs are available in low income residencial areas?

    3. What type of special care services for children is available near affordable housing?
