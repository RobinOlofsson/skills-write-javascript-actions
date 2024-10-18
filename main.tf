terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "2.5.2"
    }
  }
}

resource "local_file" "test" {
  filename = "README.md"
  content  = "Hello world!"
}
