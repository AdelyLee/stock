import * as React from "react";
import { Card, Row, Col } from 'antd';
import { getArticles } from '../service/articles'
import '@/style/home.scss'
const Title = () => <h1>文章列表</h1>;
class Articles extends React.Component<any, any> {
  showDetail = (article: any) => {
    window.open('/detail?id=' + article.id);
  }
  render() {
    return (
      <div className="article-list">
        {
          this.props.articles.map((article: any) => {
            return (
              <Card className="article-box" key={article.id} style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
                <Row>
                  <Col span={24}>
                    <span className="title" onClick={this.showDetail.bind(this, article)}>
                      {article.title}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <div className="article-content">
                    <p>{article.content}</p>
                  </div>
                </Row>
              </Card>
            )
          })
        }
      </div>
    )
  }
}

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { articles: [] };
  }

  componentWillMount() {
    let params = {
      date: {
        startDate: '2017-09-15',
        endDate: '2017-09-16'
      },
      page: {
        limit: 10,
        orders: [],
        page: 1
      },
      type: ['news']
    }
    getArticles(params).then(data => {
      let { content } = data
      this.setState({ articles: content })
    }).catch(error => {

    })
  }

  render() {
    return (
      <div id="home">
        <Col span={18} offset={3}>
          <Title />
          <Articles articles={this.state.articles} />
        </Col>
      </div>
    );
  }
}

export default Home;
