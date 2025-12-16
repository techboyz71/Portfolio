import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Reading Parkinson's CSV file (must keep in project directory)
df = pd.read_csv('parkinsons.csv')

print("Shape of dataset:", df.shape)
print(df.head())

X = df.drop(columns=['name', 'status'])
y = df['status']

train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
train_X = scaler.fit_transform(train_X)
test_X = scaler.transform(test_X)

model = RandomForestClassifier(random_state=42)
model.fit(train_X, train_y)

pred_y = model.predict(test_X)

print("Accuracy:", accuracy_score(test_y, pred_y))
print("\nClassification Reporting:\n", classification_report(test_y, pred_y))

confmatrix = confusion_matrix(test_y, pred_y)
sns.heatmap(confmatrix, annot=True, fmt='d', cmap='Blues')
plt.title('ParkCheck - Confusion Matrix')
plt.xlabel('Prediction')
plt.ylabel('Actual')
plt.show()

# Additional Features
fi = model.feature_importances_
f = X.columns
imp_df = pd.DataFrame({'Feature': f, 'Importance': fi})
imp_df = imp_df.sort_values(by='Importance', ascending=False)

print("\nCommon Features:")
print(imp_df.head)

sns.barplot(x='Importance', y='Feature', data=imp_df.head(10))
plt.title("Most Important Features")
plt.show()

print("\nFinished")