# Lessons Learned - Backup Script

## Patterns
- Creating a simple shell script for recurring tasks like backups ensures consistency.
- Using `date +"%Y%m%d_%H%M%S"` provides a sortable and unique timestamp for file names.

## Mistakes/Corrections
- Initially considered putting the script inside `endless-transit`, but it's better to keep it outside to backup the folder itself more easily without including the script or its previous backups if configured differently (though `tar` handles recursion, it's cleaner outside).
