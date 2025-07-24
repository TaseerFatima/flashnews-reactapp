import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- NewsFlash`;
  }

  async updatenews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b95372f69cd142e9b526977f1b97f7f4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b95372f69cd142e9b526977f1b97f7f4&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //         loading:true
    //       });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState ({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.updatenews();
  }

  // handlenextclick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updatenews();
  // };

  // handlepreviousclick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updatenews();
  // };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b95372f69cd142e9b526977f1b97f7f4&page=${nextPage}&pageSize=${this.props.pageSize}`;
    
  this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center "
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          NewsFlash-Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitems
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.aljazeera.com/wp-content/uploads/2025/07/13207443-1753078512.jpg?resize=1200%2C675"
                      }
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      newsurl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
