export interface ProbabilityItem {
  class_id: number;
  label: string;
  short_label: string;
  probability: number;
  percentage: string;
}

export interface PredictionResponse {
  prediction: string;
  prediction_id: number;
  confidence: number;
  confidence_percentage: string;
  is_malignant_risk: boolean;
  probabilities: ProbabilityItem[];
  inference_time_ms: number;
  model_version: string;
}
