***ParkCheck - A Voice Based Parkinson's Detection System***

**IMPORTANT**: Python 3.13 was used in making this project.

<p>ParkCheck is a machine learning model that predicts the likelihood of having 
Parkinson's disease given a set of biomedical voice features.It demonstrates how 
machine learning assists with the early and non-invasive detection of PD while
using vocal biofeatures and predictive models. This model integrates a Random Forest
Classifier that uses data from the UCI ML Repository.</p>

------------------------------------------------------------

**Accessing the Dataset:** [Parkinson's Disease Dataset](https://archive.ics.uci.edu/dataset/174/parkinsons)

**About the Dataset:**
Contains 197 samples and 22 biomedical voice features, with an additional value -
target label, called  status, where 0 indicates a healthy patient and 1 is a patient
with Parkinson's Disease.

--------------------------------------------------------------

**Python Libraries:**
This project would not have been possible without the following libraries.</p>
*<p>Pandas (data handling and preprocessing)*</p>
*<p>Scikit-Learn (ML tools - train_test_split, standardscaler, randomforestclassifier, and metrics</p>*
*<p>Matplotlib (data visualization)</p>*
*<p>Seaborn (plot enhancements)</p>*

---------------------------------------------------------------

**Running ParkCheck:**
1) Download this project. Ensure that the following files are present:
parkinsons.csv (dataset), parkcheck.py (main script), and parkcheck_readme.md
2) Check which version of Python you are using by running python --version
3) If not already done, please install the necessary libraries as utilized by
running pip install pandas scikit-learn matplotlib seaborn
4) Run the program: python parkcheck.py (if not, use python3 parkcheck.py)
You should be able to see a summary of the dataset, model accuracy, classification report, and the confusion matrix with an additional feature importance plots


