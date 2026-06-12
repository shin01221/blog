---
title: "lvm"
description: "lvm commands overview"
pubDate: 2026-06-12
tags: [lvm, linux, storage]
---


# **LVM** Commands

**LVM** (**Logical Volume Manager**) allows flexible disk management by abstracting physical
storage into logical volumes. Below are key commands, organized by component.

---

## Physical Volume (**PV**) Commands

- `pvcreate /dev/sdx`: Initialize a disk as a physical volume.
- `pvremove /dev/sdx`: Remove physical volume metadata.
- `pvdisplay /dev/sdx`: Show detailed info about a physical volume.
- `pvs`: List all physical volumes (short format).
- `pvscan`: Scan for physical volumes.

---

## Volume Group (**VG**) Commands

- `vgcreate vg_name /dev/sdx`: Create a volume group from physical volumes.
- `vgextend vg_name /dev/sdy`: Add a physical volume to an existing volume group.
- `vgreduce vg_name /dev/sdy`: Remove a physical volume from a volume group.
- `vgremove vg_name`: Delete a volume group.
- `vgdisplay vg_name`: Show detailed info about a volume group.
- `vgs`: List all volume groups (short format).
- `vgscan`: Scan for volume groups.

---

## Logical Volume (**LV**) Commands

- `lvcreate -L 10G -n lv_name vg_name`: Create a logical volume (10GB size).
- `lvremove /dev/vg_name/lv_name`: Delete a logical volume.
- `lvrename vg_name old_lv new_lv`: Rename a logical volume.
- `lvdisplay /dev/vg_name/lv_name`: Show detailed info about a logical volume.
- `lvs`: List all logical volumes (short format).
- `lvscan`: Scan for logical volumes.
- `lvchange -an /dev/vg_name/lv_name`: Deactivate a logical volume.
- `lvchange -ay /dev/vg_name/lv_name`: Activate a logical volume.

---

## Resizing Logical Volumes

- **Extend** (increase size):

  ```bash
  lvextend --resizefs -L +5G /dev/vg_name/lv_name
  # Or specify device: lvextend -L +2G /dev/vg_name/lv_name /dev/sdx
  ```

- **Reduce** (decrease size):
  ```bash
  lvreduce --resizefs -L -5G /dev/vg_name/lv_name
  ```

> [!NOTE]
> The `--resizefs` option automatically resizes the filesystem. Without it, manually run
> `resize2fs -p /dev/vg_name/lv_name` to apply changes. Always backup data before resizing!

---

## Adding a New Disk to **LVM**

1. Initialize as physical volume: `pvcreate /dev/sdx`
2. Extend volume group: `vgextend vg_name /dev/sdx`
3. (Optional) Extend logical volume: `lvextend -L +10G /dev/vg_name/lv_name`

---

## Snapshots

- **Create** a snapshot:

  ```bash
  lvcreate -L 1G -s -n snapshot_name /dev/vg_name/original_lv
  ```

- **Restore** from snapshot:

  ```bash
  umount /dev/vg_name/original_lv  # Unmount first
  lvconvert --merge /dev/vg_name/snapshot_name
  # Reactivate if needed
  lvchange -ay /dev/vg_name/original_lv
  ```

- **Remove** snapshot: `lvremove /dev/vg_name/snapshot_name`

> [!NOTE]
> Snapshots are read-write copies; merging overwrites the original. Use for backups/testing.

---

## Additional Tips

- **Stratis**: Recommended tool for simplified storage management on top of LVM, offering pools, filesystems, snapshots, and thin provisioning.
  See [[stratis]] for details.
- **Move data**: `pvmove /dev/sdx` to relocate data from a physical volume.
- **Check health**: Use `vgdisplay` or `lvdisplay` for status.
- **Filesystem tools**: Pair with `mkfs` for formatting, `mount` for access.
- **Backup first**: Always backup before major changes like resizing or removing.
