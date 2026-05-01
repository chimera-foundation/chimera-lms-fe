export interface LearningCourse {
  id: string;
  title: string;
  subject_code: string;
  teacher_name: string;
  periods_per_week: number;
  progress: number;
}

export interface LearningResource {
  id: string;
  title: string;
  subject: string;
  file_size: number;
  storage_reference: string;
}

export interface LearningModule {
  id: string;
  topic_id: string;
  type: string;
  title: string;
  resource_path: string;
  order_index: number;
  status: string;
}

export interface LearningTopic {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  modules: LearningModule[];
}

export interface CourseCurriculum {
  course_id: string;
  topics: LearningTopic[];
}

export interface GetLearningCoursesResponse {
  code: number;
  status: string;
  data: {
    data: LearningCourse[];
  };
}

export interface GetLearningResourcesResponse {
  code: number;
  status: string;
  data: {
    data: LearningResource[];
    meta: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

export interface GetCourseCurriculumResponse {
  code: number;
  status: string;
  data: {
    data: CourseCurriculum;
  };
}

export interface CompleteModuleResponse {
  code: number;
  status: string;
  data: {
    message: string;
  };
}
