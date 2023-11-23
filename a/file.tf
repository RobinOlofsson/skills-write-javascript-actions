resource "google_project_iam_binding" "project" {
  project = "your-project-id"
  role    = "roles/cloudsql.instanceUser"

  members = [
    "user:jane@example.com",
  ]
}