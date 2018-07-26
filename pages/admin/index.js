import React from 'react';
import Head from 'next/head';

import ProtectedPage from '../_protected';
import Error from '../_error';

import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import Content from '../../components/Content';
import Footer from '../../components/Footer';

import PanelSection from '../../components/admin/PanelSection';
import PanelSectionItem from '../../components/admin/PanelSectionItem';
import Button from '../../components/ui/Button';

import API from '../../services/api';
import { getAllCookies } from '../../services/cookies';

class IndexPage extends ProtectedPage {
  static async getInitialProps({ req, res }) {
    const cookies = getAllCookies(req);

    const parentProps = await super.getInitialProps({ req, res });
    const queryParams = {
      page: 1,
      limit: 7,
      sort: '-createdAt',
    };
    const lastPublishedArticles = await API.articles.find({
      ...queryParams,
      private: false,
    }, cookies);
    const lastDrafts = await API.articles.find({
      ...queryParams,
      private: true,
    }, cookies);
    const lastProjects = await API.projects.find(queryParams, cookies);
    const lastCategories = await API.categories.find(queryParams, cookies);
    const lastPages = await API.pages.find(queryParams, cookies);
    const lastPhotoAlbums = await API.photoAlbums.find(queryParams, cookies);

    return {
      ...parentProps,
      lastPublishedArticles: lastPublishedArticles.docs,
      lastDrafts: lastDrafts.docs,
      lastProjects: lastProjects.docs,
      lastCategories: lastCategories.docs,
      lastPages: lastPages.docs,
      lastPhotoAlbums: lastPhotoAlbums.docs,
    };
  }

  render() {
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    const {
      lastPublishedArticles,
      lastDrafts,
      lastProjects,
      lastCategories,
      lastPages,
      lastPhotoAlbums,
    } = this.props;

    return (
      <Wrapper>
        <Head>
          <title>Панель керування</title>
        </Head>
        <Header admin />
        <Content className="container">
          <div className="layout-row layout-wrap children-horizontal-padding children-vertical-padding margin-bottom margin-top">
            <Button color="black" href="/admin/articles/new">Нова стаття</Button>
            <Button color="black" href="/admin/pages/new">Нова сторінка</Button>
            <Button color="black" href="/admin/projects/new">Новий проект</Button>
            <Button color="black" href="/admin/categories/new">Нова категорія</Button>
            <Button color="black" href="/admin/photo-albums/new">Новий альбом</Button>
          </div>
          <div className="layout-row layout-wrap children-horizontal-padding children-vertical-padding">
            <PanelSection title="Опубліковані статті" href="articles?private=false" className="flex-100 flex-gt-xs-50">
              {lastPublishedArticles.map(article => <PanelSectionItem key={article.id} {...article} type="article" />)}
            </PanelSection>
            <PanelSection title="Чернетки" href="articles?private=true" className="flex-100 flex-gt-xs-50">
              {lastDrafts.map(draft => <PanelSectionItem key={draft.id} hideBadges {...draft} type="article" />)}
            </PanelSection>
            <PanelSection title="Проекти" href="projects" className="flex-100 flex-gt-xs-50">
              {lastProjects.map(project => <PanelSectionItem key={project.id} {...project} type="project" />)}
            </PanelSection>
            <PanelSection title="Категорії" href="categories" className="flex-100 flex-gt-xs-50">
              {lastCategories.map(category => <PanelSectionItem key={category.id} {...category} type="category" />)}
            </PanelSection>
            <PanelSection title="Сторінки" href="pages" className="flex-100 flex-gt-xs-50">
              {lastPages.map(page => <PanelSectionItem key={page.id} {...page} type="page" />)}
            </PanelSection>
            <PanelSection title="Альбоми" href="photo-albums" className="flex-100 flex-gt-xs-50">
              {lastPhotoAlbums.map(photoAlbum => <PanelSectionItem key={photoAlbum.id} {...photoAlbum} type="photo-album" />)}
            </PanelSection>
          </div>
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

export default IndexPage;
