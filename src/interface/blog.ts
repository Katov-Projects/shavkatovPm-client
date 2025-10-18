export interface IBlogCreate {
  header: {
    title: string;
    subtitle: string;
  };
  categoryId: string;
  sections: {
    title: string;
    subtitle: string;
  }[];
  tags: {
    value: string;
  }[];
  seo: {
    value: string;
  }[];
}

export interface IBlogUpdate {
  header: {
    title: string;
    subtitle: string;
  };
  categoryId: string;
  sections: {
    title: string;
    subtitle: string;
  }[];
  tags: {
    value: string;
  }[];
  seo: {
    value: string;
  }[];
}
