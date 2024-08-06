import streamlit as st
import requests
import pandas as pd

# Backend URL configuration
backend_url = "http://localhost:5001"

# Set page configuration
st.set_page_config(page_title="URL Shortener", page_icon="🔗", layout="centered")

# Page header
st.title("🔗 URL Shortener")

# Tabs for different functionalities
tab1, tab2 = st.tabs(["Shorten URL", "URL Statistics"])

# Shorten URL Tab
with tab1:
    st.header("Shorten Your URL")
    
    long_url = st.text_input("Enter the long URL:", placeholder="https://example.com")
    custom_alias = st.text_input("Enter custom alias (optional):", placeholder="my-custom-alias")
    
    if st.button("Shorten URL"):
        if not long_url:
            st.error("Please enter a valid URL.")
        else:
            payload = {"longUrl": long_url, "customAlias": custom_alias}
            with st.spinner('Shortening URL...'):
                try:
                    response = requests.post(f"{backend_url}/shorten", json=payload)
                    if response.status_code == 200:
                        short_url = response.json()["shortUrl"]
                        st.success("URL shortened successfully!")
                        st.markdown(f"**Short URL:** [{short_url}]({short_url})")
                    else:
                        st.error(f"Error: {response.text}")
                except requests.exceptions.RequestException as e:
                    st.error(f"An error occurred: {e}")

# URL Statistics Tab
with tab2:
    st.header("URL Statistics")
    
    url_code = st.text_input("Enter the URL code for stats:", placeholder="custom-alias-or-code")
    
    if st.button("Get Stats"):
        if not url_code:
            st.error("Please enter a valid URL code.")
        else:
            with st.spinner('Fetching statistics...'):
                try:
                    response = requests.get(f"{backend_url}/stats/{url_code}")
                    if response.status_code == 200:
                        url_data = response.json()
                        st.success("Statistics fetched successfully!")
                        st.markdown(f"**Long URL:** [{url_data['longUrl']}]({url_data['longUrl']})")
                        st.markdown(f"**Clicks:** {url_data['clicks']}")
                        st.markdown(f"[Visit URL](http://localhost:5001/{url_code})")
                        
                        # Visualize statistics using Streamlit's built-in line chart
                        st.subheader("Clicks Over Time")
                        # Assuming the backend provides a list of dates for each click
                        click_data = {
                            'Date': pd.date_range(start='1/1/2022', periods=url_data['clicks']),
                            'Clicks': [1] * url_data['clicks']
                        }
                        df = pd.DataFrame(click_data)
                        df['Cumulative Clicks'] = df['Clicks'].cumsum()
                        
                        st.line_chart(df[['Date', 'Cumulative Clicks']].set_index('Date'))
                    else:
                        st.error(f"Error: {response.text}")
                except requests.exceptions.RequestException as e:
                    st.error(f"An error occurred: {e}")
